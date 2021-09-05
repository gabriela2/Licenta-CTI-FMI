using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Repositories.DeliveryTypeRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
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

        [Authorize] 
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryTypeDto>> GetDeliveryType(int id)
        {
            var deliveryType = await _deliveryTypeRepository.GetDeliveryTypeDtoByIdAsync(id);
            return deliveryType;
        }

        

    }
}