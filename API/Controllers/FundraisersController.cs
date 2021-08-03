using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.FundraiserRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FundraisersController : ControllerBase
    {
        private readonly IFundraiserRepository _fundraiserRepository;
        public FundraisersController(IFundraiserRepository fundraiserRepository)
        {
            _fundraiserRepository = fundraiserRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FundraiserDto>>> GetFundraisers()
        {
            var fundraisers = await _fundraiserRepository.GetFundraisersAsync();
            return Ok(fundraisers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FundraiserDto>> GetFundraiser(int id)
        {
            var fundraiser = await _fundraiserRepository.GetFundraiserDtoByIdAsync(id);
            return fundraiser;
        }

        [HttpGet("user-fundraisers/{id}")]
        public async Task<ActionResult<FundraiserDto>> GetFundraisersByUserId(int id)
        {
            var fundraisers = await _fundraiserRepository.GetFundraisersByUserIdAsync(id);
            return Ok(fundraisers);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFundraiser(int id, FundraiserDto fundraiserDto)
        {
            Fundraiser fundraiser = await _fundraiserRepository.GetFundraiserByIdAsync(fundraiserDto.Id);
            if (id != fundraiser.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            fundraiser.Name = fundraiserDto.Name;
            fundraiser.Description = fundraiserDto.Description;
            fundraiser.CurrentAmount = fundraiserDto.CurrentAmount;
            fundraiser.TargetAmount = fundraiserDto.TargetAmount;
            fundraiser.IsValidated = fundraiserDto.IsValidated;

            _fundraiserRepository.UpdateFundraiser(fundraiser);
            if (await _fundraiserRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Strangerea de fonduri nu a putut fi actualizata");
        }

        [HttpPost]
        public async Task<ActionResult> AddFundraiser(FundraiserDto fundraiserDto)
        {
            Fundraiser model = new Fundraiser()
            {
                Name = fundraiserDto.Name,
                Description = fundraiserDto.Description,
                CreatedAt = fundraiserDto.CreatedAt,
                CurrentAmount = 0,
                TargetAmount = fundraiserDto.TargetAmount,
                IsValidated = false,
                UserId = fundraiserDto.UserId,
            };
            _fundraiserRepository.AdFundraiser(model);
            if (await _fundraiserRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Strangerea de fonduri nu a putut fi adaugata");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFundraiser(int id)
        {
            Fundraiser fundraiser = await _fundraiserRepository.GetFundraiserByIdAsync(id);
            if (fundraiser == null)
            {
                return NotFound();
            }
            _fundraiserRepository.DeleteFundraiser(fundraiser);
            if (await _fundraiserRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Strangerea de fonduri nu a putut fi stearsa");

        }
    }
}