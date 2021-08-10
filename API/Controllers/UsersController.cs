using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Repositories.UserPhotoRepository;
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
    [ServiceFilter(typeof(ModifyLastActivityForUser))]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ICloudinaryPhotoService _cloudinaryPhotoService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserPhotoRepository _userPhotoRepository;
        public UsersController(IUserRepository userRepository, IUserPhotoRepository userPhotoRepository, IMapper mapper, ICloudinaryPhotoService cloudinaryPhotoService)
        {
            _userPhotoRepository = userPhotoRepository;

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

            var photo = new UserPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };

            if (user.Photo != null)
            {
                await _cloudinaryPhotoService.DeleteCloudinaryPhotoAsync(user.Photo.PublicId);
            }

            user.Photo = photo;


            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { id = userId }, _mapper.Map<UserPhotoDto>(photo));
            }
            return BadRequest("Fotografia nu a putut fi adaugata");
        }

        [HttpDelete("delete-photo/")]
        public async Task<ActionResult> DeletePhoto()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            User user = await _userRepository.GetUserByIdAsync(userId);

            var photo = user.Photo;

            if (photo == null) return NotFound();
            if (photo.PublicId != null)
            {
                var result = await _cloudinaryPhotoService.DeleteCloudinaryPhotoAsync(photo.PublicId);
                if (result.Error != null){
                     return BadRequest(result.Error.Message);
                }
            }

            _userPhotoRepository.DeleteUserPhoto(photo);

            if (await _userPhotoRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Fotografia nu a putut fi stearsa");
        }




    }
}