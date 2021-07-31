using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.UnitOfMeasureRepository;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UnitsOfMeasureController : ControllerBase
    {
        private readonly IUnitOfMeasureRepository _unitOfMeasureRepository;

        public UnitsOfMeasureController(IUnitOfMeasureRepository unitOfMeasureRepository)
        {
            _unitOfMeasureRepository = unitOfMeasureRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitOfMeasureDto>>> GetUnitsOfMeasure()
        {
            var unitsOfMeasure = await _unitOfMeasureRepository.GetUnitsOfMeasureAsync();
            return Ok(unitsOfMeasure);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UnitOfMeasureDto>> GetUnitOfMeasure(int id)
        {
            var unitOfMeasure = await _unitOfMeasureRepository.GetUnitOfMeasureDtoByIdAsync(id);
            return unitOfMeasure;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUnitOfMeasure(int id, UnitOfMeasureDto unitOfMeasureDto)
        {
            UnitOfMeasure unitOfMeasure = await _unitOfMeasureRepository.GetUnitOfMeasureByIdAsync(unitOfMeasureDto.Id);
            if(id!= unitOfMeasure.Id)
            {
               return BadRequest("S-a intamplat ceva neasteptat");
            }

            unitOfMeasure.Name =unitOfMeasureDto.Name;
            unitOfMeasure.Description=unitOfMeasureDto.Description;
            unitOfMeasure.Abbreviation = unitOfMeasureDto.Abbreviation;
            _unitOfMeasureRepository.UpdateUnitOfMeasure(unitOfMeasure);
            if(await _unitOfMeasureRepository.SaveAllAsync())return NoContent();
            return BadRequest("UnitOfMeasure-ul nu a putut fi actualizat");

        }

        [HttpPost]
        public async Task<ActionResult> AddUnitOfMeasure(UnitOfMeasureDto unitOfMeasureDto)
        {
            UnitOfMeasure model = new UnitOfMeasure()
            {
                Name = unitOfMeasureDto.Name,
                Description = unitOfMeasureDto.Description,
                Abbreviation = unitOfMeasureDto.Abbreviation,
            };
            _unitOfMeasureRepository.AddUnitOfMeasure(model);
            if(await _unitOfMeasureRepository.SaveAllAsync())return NoContent();
            return BadRequest("UnitOfMeasure-ul nu a putut fi adaugat");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUnitOfMeasure(int id)
        {
            var unitOfMeasure = await _unitOfMeasureRepository.GetUnitOfMeasureByIdAsync(id);
            if(unitOfMeasure ==null){return NotFound();}
            _unitOfMeasureRepository.DeleteUnitOfMeasure(unitOfMeasure);
            if(await _unitOfMeasureRepository.SaveAllAsync())return NoContent();
            return BadRequest("UnitOfMeasure-ul nu a putut fi sters");
        }
    }
}