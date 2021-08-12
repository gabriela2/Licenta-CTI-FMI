using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Repositories.UnitOfMeasureRepository;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(ModifyLastActivityForUser))]
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

        
    }
}