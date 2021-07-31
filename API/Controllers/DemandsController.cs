using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.DemandRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DemandsController : ControllerBase
    {
        private readonly IDemandRepository _demandRepository;
        public DemandsController(IDemandRepository demandRepository)
        {
            _demandRepository = demandRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemandDto>>> GetDemands()
        {
            var demands = await _demandRepository.GetDemandsAsync();
            return Ok(demands);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<DemandDto>> GetDemand(int id)
        {
            var demand = await _demandRepository.GetDemandDtoByIdAsync(id);
            return demand;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDemand(int id, DemandDto demandDto)
        {
            Demand demand = await _demandRepository.GetDemandByIdAsync(demandDto.Id);
            if(id!= demand.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }
            demand.QuantityRequested = demandDto.QuantityRequested;
            demand.IsApproved = demandDto.IsApproved;
            demand.DeliveryTypeSelected = demandDto.DeliveryTypeSelected;
            _demandRepository.UpdateDemand(demand);
            if(await _demandRepository.SaveAllAsync())return NoContent();
            return BadRequest("Demand-ul nu a putut fi actualizat");
        }

        [HttpPost]
        public async Task<ActionResult> AddDemand(DemandDto demandDto)
        {
            Demand model = new Demand()
            {
                CreatedAt = demandDto.CreatedAt,
                QuantityRequested = demandDto.QuantityRequested,
                IsApproved = demandDto.IsApproved,
                DeliveryTypeSelected = demandDto.DeliveryTypeSelected,
                UserId = demandDto.UserId,
                AdId = demandDto.AdId
            };
            _demandRepository.AddDemand(model);
            if(await _demandRepository.SaveAllAsync())return NoContent();
            return BadRequest("Cererea nu a putut fi adaugat");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDemand(int id)
        {
            var demand = await _demandRepository.GetDemandByIdAsync(id);
            if(demand == null)
            {
                return NotFound();
            }
            _demandRepository.DeleteDemand(demand);
            if(await _demandRepository.SaveAllAsync())return NoContent();
            return BadRequest("Cererea nu a putut fi sters");
        }
    }
}