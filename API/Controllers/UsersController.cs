using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Repositories.UserRepository;
using AutoMapper;
using HelpAFamilyOfferAChance.API.Data;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpAFamilyOfferAChance.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            var user = await _userRepository.GetMemberAsync(id);
            return user;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, MemberDto memberDto)
        {
            User member = await _userRepository.GetUserByIdAsync(memberDto.Id);
            if(id!= member.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }
            
            member.LastName=memberDto.LastName;
            member.FirstName = memberDto.FirstName;
            member.PhoneNumber = memberDto.PhoneNumber;
            member.LastActivity = memberDto.LastActivity;
            member.StripeAccount = memberDto.StripeAccount;
            member.StripeConfigurationLink = memberDto.StripeConfigurationLink;
            member.EmailConfirmed = memberDto.EmailConfirmed;
            member.IsOrganisation = memberDto.IsOrganisation;
            member.OrganizationIdentificationNumber = memberDto.OrganizationIdentificationNumber;
            _userRepository.Update(member);
            if(await _userRepository.SaveAllAsync())return NoContent();
            return BadRequest("Userul nu a putut fi actualizat");
        }




    }
}