using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
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

        [HttpGet("approved-by-user-id/{id}")]
        public async Task<ActionResult<IEnumerable<DemandDto>>> GetApprovedDemandsByUserId([FromQuery]AppParams appParams, int id)
        {
            var demands = await _demandRepository.GetApprovedDemandsByUserIdAsync(appParams, id);
            Response.AddPaginationHeader(demands.CurrentPage, demands.PageSize, demands.TotalCount,demands.TotalPages);
            return Ok(demands);
        }



        [HttpGet("not-approved-yet-by-user-id/{id}")]
        public async Task<ActionResult<IEnumerable<DemandDto>>> GetNotApprovedYetDemandsByUserId([FromQuery]AppParams appParams, int id)
        {
            var demands = await _demandRepository.GetNotApprovedYetDemandsByUserIdAsync(appParams, id);
            Response.AddPaginationHeader(demands.CurrentPage, demands.PageSize, demands.TotalCount,demands.TotalPages);
            return Ok(demands);
        }




        [HttpGet("rejected-by-user-id/{id}")]
        public async Task<ActionResult<IEnumerable<DemandDto>>> GetRejectedDemandsByUserId([FromQuery]AppParams appParams, int id)
        {
            var demands = await _demandRepository.GetRejectedDemandsByUserIdAsync(appParams, id);
            Response.AddPaginationHeader(demands.CurrentPage, demands.PageSize, demands.TotalCount,demands.TotalPages);
            return Ok(demands);
        }



        [HttpGet("unapproved-by-ad-id/{id}")]
        public async Task<ActionResult<IEnumerable<DemandDto>>> GetUnapprovedDemandsByAdId([FromQuery]AppParams appParams, int id)
        {
            var demands = await _demandRepository.GetUnapprovedDemandsByAdIdAsync(appParams, id);
            Response.AddPaginationHeader(demands.CurrentPage, demands.PageSize, demands.TotalCount,demands.TotalPages);
            return Ok(demands);
        }



        [HttpGet("all-by-ad-id/{id}")]
        public async Task<ActionResult<IEnumerable<DemandDto>>> GetAllDemandsByAdId([FromQuery]DemandsParams demandsParams, int id)
        {
            var demands = await _demandRepository.GetAllDemandsByAdIdAsync(demandsParams, id);
            Response.AddPaginationHeader(demands.CurrentPage, demands.PageSize, demands.TotalCount,demands.TotalPages);
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
            if (id != demandDto.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            demand.IsApproved = demandDto.IsApproved;
            demand.IsDeclined = demandDto.IsDeclined;
            demand.DeliveryTypeSelected = demandDto.DeliveryTypeSelected;
            demand.QuantityRequested = demandDto.QuantityRequested;

            _demandRepository.UpdateDemand(demand);
            if (await _demandRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Anuntul nu a putut fi actualizat");
        }
        

        [HttpPost]
        public async Task<ActionResult> AddDemand(DemandDto demandDto)
        {
            Demand model = new Demand()
            {
                QuantityRequested = demandDto.QuantityRequested,
                IsApproved = false,
                IsDeclined = false,
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