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
using API.Services.MailService;
using API.Services.MailService.Template;
using API.Repositories.UserRepository;
using API.Helpers;
using API.Entities;
using System.Linq;

namespace HelpAFamilyOfferAChance.API.Controllers
{
    [ServiceFilter(typeof(ModifyLastActivityForUser))]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;
        public AuthController(DataContext context, ITokenService tokenService, IEmailService emailService, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _context = context;
            _emailService = emailService;
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
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            var memberRole= _context.RoleTypes.Where(role => role.Name=="Member").SingleOrDefault();
            _context.Users_X_RoleTypes.Add(new User_x_RoleType{UserId=user.Id,RoleTypeId=memberRole.Id});
            await _context.SaveChangesAsync();


            ConfirmationEmailTemplate emailTemplate = new ConfirmationEmailTemplate();
            emailTemplate.url = "http://localhost:4200/#/verify-email/" + user.Id;
            emailTemplate.username = user.UserName;
            await _emailService.SendConfirmationEmailAsync(user.Email, "Validare cont", emailTemplate);


            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)

            };


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