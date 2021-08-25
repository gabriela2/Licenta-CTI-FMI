using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Repositories.DonationRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class DonationsController : ControllerBase
    {
        private readonly IDonationRepository _donationRepository;
        public DonationsController(IDonationRepository donationRepository)
        {
            _donationRepository = donationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonationDto>>> GetDonations()
        {
            var donations = await _donationRepository.GetDonationsAsync();
            return Ok(donations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<DonationDto>>> GetDonationsByUserId([FromQuery]AppParams appParams, int id)
        {
            var donations = await _donationRepository.GetDonationsByUserIdAsync(appParams, id);
            Response.AddPaginationHeader(donations.CurrentPage, donations.PageSize, donations.TotalCount,donations.TotalPages);
            return Ok(donations);
        }

        [HttpPost]
        public async Task<ActionResult> AddDonation(DonationDto donationDto)
        {
            Donation model = new Donation()
            {
                Amount = donationDto.Amount,
                Description= donationDto.Description,
                UserId = donationDto.UserId,
                FundraiserId = donationDto.FundraiserId
            };

            _donationRepository.AddDonation(model);
            if (await _donationRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Donatia nu a putut fi adaugata");

        }


    }
}