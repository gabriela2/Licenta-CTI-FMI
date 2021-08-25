using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using HelpAFamilyOfferAChance.API.Data;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using API.Services;
using API.Repositories.UserRepository;
using API.Helpers;
using API.Entities;
using System.Linq;
using API.Services.MailService;
using API.Services.MailService.Templates;

namespace HelpAFamilyOfferAChance.API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly IMailService _mailService;
        public AuthController(DataContext context, ITokenService tokenService, IUserRepository userRepository, IMailService mailService)
        {
            _mailService = mailService;
            _userRepository = userRepository;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserNameExists(registerDto.Username)) return BadRequest("Exista un utilizator inregistrat cu usernameul introdus de dvs.");
            if (await EmailExists(registerDto.Email)) return BadRequest("Exista un utilizator inregistrat cu emailul introdus de dvs.");
            if (!EmailValidation(registerDto.Email)) return BadRequest("Emailul introdus nu este valid");

            using var hmac = new HMACSHA512();
            var user = new User
            {
                Email = registerDto.Email.ToLower(),
                UserName = registerDto.Username.ToLower(),
                LastName = registerDto.LastName.ToLower(),
                FirstName = registerDto.FirstName.ToLower(),
                PhoneNumber = registerDto.PhoneNumber,
                IsOrganisation = registerDto.IsOrganisation,
                OrganizationIdentificationNumber= registerDto.OrganizationIdentificationNumber,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            var memberRole = _context.RoleTypes.Where(role => role.Name == "Member").SingleOrDefault();
            _context.Users_X_RoleTypes.Add(new User_x_RoleType { UserId = user.Id, RoleTypeId = memberRole.Id });
            await _context.SaveChangesAsync();
            var address = new Address
            {
                HouseNumber= registerDto.HouseNumber,
                Street = registerDto.Street,
                City = registerDto.City,
                District = registerDto.District,
                Country = registerDto.Country,
                ZipCode=  registerDto.ZipCode,
                UserId = user.Id
            };
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();


            EmailConfirmationTemplate emailTemplate = new EmailConfirmationTemplate();
            emailTemplate.url = "https://localhost:4200/emailConfirmation/" + user.Id.ToString();
            emailTemplate.username = user.UserName;
            await _mailService.SendEmailConfirmationAsync(user.Email, "Validare cont", emailTemplate);
            
            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)

            };


        }

        [HttpPut("activate-account/{id}")]
        public async Task<ActionResult> ActivateAccount(int id)
        {
            User user = await _userRepository.GetUserByIdAsync(id);
           user.EmailConfirmed=true;
            _userRepository.Update(user);
            if(await _userRepository.SaveAllAsync())return NoContent();
            return BadRequest("Contul nu a putut fi activat");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null) return Unauthorized("Email incorect");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Parola incorecta");
            }
            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)

            };

        }

        




        private async Task<bool> UserNameExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.UserName == username.ToLower());
        }
        private async Task<bool> EmailExists(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email.ToLower());
        }
        private static bool EmailValidation(string email)
        {
            const string pattern = @"^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|" + @"([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)" + @"@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$";
            var result = new Regex(pattern, RegexOptions.IgnoreCase).IsMatch(email);
            return result;

        }



    }
}