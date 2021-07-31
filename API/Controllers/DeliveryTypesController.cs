using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.DeliveryTypeRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryTypesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDeliveryTypeRepository _deliveryTypeRepository;
        public DeliveryTypesController(IDeliveryTypeRepository deliveryTypeRepository, IMapper mapper)
        {
            _deliveryTypeRepository = deliveryTypeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryTypeDto>>> GetDeliveryTypes()
        {
            var deliveryTypes = await _deliveryTypeRepository.GetDeliveryTypesAsync();
            return Ok(deliveryTypes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryTypeDto>> GetDeliveryType(int id)
        {
            var deliveryType = await _deliveryTypeRepository.GetDeliveryTypeDtoByIdAsync(id);
            return deliveryType;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDeliveryType(int id, DeliveryTypeDto deliveryTypeDto)
        {
            DeliveryType deliveryType = await _deliveryTypeRepository.GetDeliveryTypeByIdAsync(deliveryTypeDto.Id);
            if (id != deliveryType.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }
            deliveryType.Description = deliveryTypeDto.Description;
            deliveryType.Name = deliveryTypeDto.Name;
            deliveryType.Price = deliveryTypeDto.Price;
            _deliveryTypeRepository.UpdateDeliveryType(deliveryType);
            if (await _deliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("DeliveryType-ul nu a putut fi actualizat");
        }

        [HttpPost]
        public async Task<ActionResult> AddDeliveryType(DeliveryTypeDto deliveryTypeDto)
        {
            DeliveryType model = new DeliveryType()
            {
                Name = deliveryTypeDto.Name,
                Description = deliveryTypeDto.Description,
                Price = deliveryTypeDto.Price
            };
            _deliveryTypeRepository.AddDeliveryType(model);
            if (await _deliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("DeliveryType-ul nu a putut fi adaugat");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDeliveryType(int id)
        {
            var deliveryType = await _deliveryTypeRepository.GetDeliveryTypeByIdAsync(id);
            if (deliveryType == null)
            {
                return NotFound();
            }
            _deliveryTypeRepository.DeleteDeliveryType(deliveryType);
            if (await _deliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("DeliveryType-ul nu a putut fi sters");

        }

    }
}