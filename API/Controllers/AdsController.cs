using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.AdRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AdsController : ControllerBase
    {
        private readonly IAdRepository _adRepository;
        public AdsController(IAdRepository adRepository)
        {
            _adRepository = adRepository;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdDto>>> GetAds()
        {
            var ads = await _adRepository.GetAdsAsync();
            return Ok(ads);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<AdDto>> GetAd(int id)
        {
            var ad = await _adRepository.GetAdDtoByIdAsync(id);
            return ad;
        }

        [HttpGet("user-ads/{id}")]
        public async Task<ActionResult<IEnumerable<AdDto>>> GetAdsByUserId(int id)
        {
            var ads = await _adRepository.GetAdsDtoByUserIdAsync(id);
            return Ok(ads);
        }



        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAd(int id,AdDto adDto)
        {
            Ad ad = await _adRepository.GetAdByIdAsync(adDto.Id);
            if (id != ad.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            ad.Name = adDto.Name;
            ad.Description = adDto.Description;
            ad.Quantity=adDto.Quantity;
            ad.ExistsLimit = adDto.ExistsLimit;
            ad.Limit = adDto.Limit;
            ad.IsActive = adDto.IsActive;
            ad.UnitOfMeasureId = adDto.UnitOfMeasureId;
            ad.CategoryId = adDto.CategoryId;

            _adRepository.UpdateAd(ad);
            if (await _adRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Anuntul nu a putut fi actualizat");
        }

        [HttpPost]
        public async Task<ActionResult> AddAd(AdDto adDto)
        {
            Ad model = new Ad()
            {
                Name=adDto.Name,
                Description=adDto.Description,
                CreatedAt=adDto.CreatedAt,
                Quantity=adDto.Quantity,
                ExistsLimit=adDto.ExistsLimit,
                Limit=adDto.Limit,
                UserId=adDto.UserId,
                UnitOfMeasureId=adDto.UnitOfMeasureId,
                CategoryId=adDto.CategoryId
            };
            _adRepository.AddAd(model);
            if (await _adRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Anuntul nu a putut fi adaugat");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAd(int id)
        {
            Ad ad = await _adRepository.GetAdByIdAsync(id);
            if (ad == null)
            {
                return NotFound();
            }
            _adRepository.DeleteAd(ad);
            if (await _adRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Anuntul nu a putut fi sters");

        }
        
    }
}