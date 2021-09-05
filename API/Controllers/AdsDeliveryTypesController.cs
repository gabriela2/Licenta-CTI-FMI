using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.AdDeliveryTypeRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AdsDeliveryTypesController : ControllerBase
    {
        private readonly IAdDeliveryTypeRepository _adDeliveryTypeRepository;
        public AdsDeliveryTypesController(IAdDeliveryTypeRepository adDeliveryTypeRepository)
        {
            _adDeliveryTypeRepository = adDeliveryTypeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ad_x_DeliveryTypeDto>>> GetAdsDeliveryByAsIdTypes()
        {
            var ads_x_deliverieTypes = await _adDeliveryTypeRepository.GetAdsDeliveryTypesAsync();
            return Ok(ads_x_deliverieTypes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ad_x_DeliveryTypeDto>> GetAdDeliveryType(int id)
        {
            var ad_x_deliverieType = await _adDeliveryTypeRepository.GetAdDeliveryTypeDtoAsync(id);
            return ad_x_deliverieType;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatedAdDeliveryType(int id, Ad_x_DeliveryTypeDto ad_X_DeliveryTypeDto)
        {
            Ad_x_DeliveryType ad_X_DeliveryType = await _adDeliveryTypeRepository.GetAdDeliveryTypeAsync(ad_X_DeliveryTypeDto.Id);
            if (id != ad_X_DeliveryType.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }
           
            ad_X_DeliveryType.DeliveryTypeId = ad_X_DeliveryTypeDto.DeliveryTypeId;
            ad_X_DeliveryType.AdId = ad_X_DeliveryTypeDto.AdId;
            _adDeliveryTypeRepository.UpdateAdDeliveryType(ad_X_DeliveryType);
            if (await _adDeliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Ad_x_DeliveryType nu a putut fi actualizat");
        }

        [HttpPost]
        public async Task<ActionResult> AddAdDeliveryType(Ad_x_DeliveryTypeDto ad_X_DeliveryTypeDto)
        {
            Ad_x_DeliveryType model = new Ad_x_DeliveryType()
            {
                AdId = ad_X_DeliveryTypeDto.AdId,
                DeliveryTypeId = ad_X_DeliveryTypeDto.DeliveryTypeId
            };;
            _adDeliveryTypeRepository.AddAdDeliveryType(model);
            if (await _adDeliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Ad_x_DeliveryType nu a putut fi adaugat");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAdDeliveryType(int id)
        {
            var ad_X_DeliveryType = await _adDeliveryTypeRepository.GetAdDeliveryTypeAsync(id);
            if (ad_X_DeliveryType == null)
            {
                return NotFound();
            }
            _adDeliveryTypeRepository.DeleteAdDeliveryType(ad_X_DeliveryType);
            if (await _adDeliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Ad_x_DeliveryType nu a putut fi sters");

        }


    }
}