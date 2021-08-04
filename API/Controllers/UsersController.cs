using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.UserRepository;
using API.Services.CloudinaryPhotoService;
using AutoMapper;
using HelpAFamilyOfferAChance.API.Data;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpAFamilyOfferAChance.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ICloudinaryPhotoService _cloudinaryPhotoService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper, ICloudinaryPhotoService cloudinaryPhotoService)
        {

            _cloudinaryPhotoService = cloudinaryPhotoService;
            _userRepository = userRepository;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            var user = await _userRepository.GetMemberAsync(id);
            return user;
        }


        [HttpPut("update-profile/{id}")]
        public async Task<ActionResult> UpdateUserProfile(int id, MemberUpdateProfileDto memberUpdateProfileDto)
        {
            User member = await _userRepository.GetUserByIdAsync(memberUpdateProfileDto.Id);
            if (id != member.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            _mapper.Map(memberUpdateProfileDto, member);

            _userRepository.Update(member);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Userul nu a putut fi actualizat");
        }


        [HttpPut("update-bank/{id}")]
        public async Task<ActionResult> UpdateUserBankDetails(int id, MemberUpdateBankDetailsDto memberUpdateBankDetailsDto)
        {
            User member = await _userRepository.GetUserByIdAsync(memberUpdateBankDetailsDto.Id);
            if (id != member.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            _mapper.Map(memberUpdateBankDetailsDto, member);

            _userRepository.Update(member);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Userul nu a putut fi actualizat");
        }


        [HttpPut("update-stripe-access/{id}")]
        public async Task<ActionResult> UpdateUserStripeAccess(int id, MemberUpdateStripeAccessDto memberUpdateStripeAccessDto)
        {
            User member = await _userRepository.GetUserByIdAsync(memberUpdateStripeAccessDto.Id);
            if (id != member.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            _mapper.Map(memberUpdateStripeAccessDto, member);

            _userRepository.Update(member);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Userul nu a putut fi actualizat");
        }

        [HttpPut("update-stripe-details/{id}")]
        public async Task<ActionResult> UpdateUserStripeDetails(int id, MemberUpdateStripeDetailsDto memberUpdateStripeDetailsDto)
        {
            User member = await _userRepository.GetUserByIdAsync(memberUpdateStripeDetailsDto.Id);
            if (id != member.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            _mapper.Map(memberUpdateStripeDetailsDto, member);

            _userRepository.Update(member);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Userul nu a putut fi actualizat");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            User user = await _userRepository.GetUserByIdAsync(userId);

            var result = await _cloudinaryPhotoService.AddCloudinaryPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                UserId = userId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);
            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { id = userId }, _mapper.Map<PhotoDto>(photo));
            }
            return BadRequest("Poza nu a putut fi adaugata");
        }




    }
}