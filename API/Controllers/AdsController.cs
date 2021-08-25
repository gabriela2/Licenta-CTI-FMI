using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Repositories.AdDeliveryTypeRepository;
using API.Repositories.AdRepository;
using API.Repositories.CategoryRepository;
using API.Repositories.DeliveryTypeRepository;
using API.Repositories.PhotoRepository;
using API.Repositories.UnitOfMeasureRepository;
using API.Services.CloudinaryPhotoService;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AdsController : ControllerBase
    {
        private readonly IAdRepository _adRepository;

        private readonly IAdDeliveryTypeRepository _adDeliveryTypeRepository;
        private readonly IDeliveryTypeRepository _deliveryTypeRepository;
        private readonly IUnitOfMeasureRepository _unitOfMeasureRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICloudinaryPhotoService _cloudinaryPhotoService;
        private readonly IMapper _mapper;
        private readonly IPhotoRepository _photoRepository;
        public AdsController(IAdRepository adRepository, IPhotoRepository photoRepository, IAdDeliveryTypeRepository adDeliveryTypeRepository, ICloudinaryPhotoService cloudinaryPhotoService, IDeliveryTypeRepository deliveryTypeRepository, ICategoryRepository categoryRepository, IUnitOfMeasureRepository unitOfMeasureRepository, IMapper mapper)
        {
            _photoRepository = photoRepository;
            _mapper = mapper;
            _cloudinaryPhotoService = cloudinaryPhotoService;
            _categoryRepository = categoryRepository;
            _unitOfMeasureRepository = unitOfMeasureRepository;
            _deliveryTypeRepository = deliveryTypeRepository;
            _adDeliveryTypeRepository = adDeliveryTypeRepository;
            _adRepository = adRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdDto>>> GetAds([FromQuery]AdsParams adsParams)
        {
            var ads = await _adRepository.GetAdsAsync(adsParams);
            Response.AddPaginationHeader(ads.CurrentPage, ads.PageSize, ads.TotalCount,ads.TotalPages);
            return Ok(ads);
        }

        [HttpGet("user-id/{id}")]
        public async Task<ActionResult<IEnumerable<AdDto>>> GetAdsByUserId(int id){
            return Ok( await _adRepository.GetAdsByUserId(id));
        }


        [HttpGet("active/{id}")]
        public async Task<ActionResult<IEnumerable<AdDto>>> GetActiveAdsByUserId([FromQuery]AdsParams adsParams, int id)
        {
            var ads = await _adRepository.GetActiveAdsByUserIdAsync(adsParams, id);
            Response.AddPaginationHeader(ads.CurrentPage, ads.PageSize, ads.TotalCount,ads.TotalPages);
            return Ok(ads);
        }

        [HttpGet("inactive/{id}")]
        public async Task<ActionResult<IEnumerable<AdDto>>> GetInactiveAdsByUserId([FromQuery]AdsParams adsParams, int id)
        {
            var ads = await _adRepository.GetInactiveAdsByUserIdAsync(adsParams, id);
            Response.AddPaginationHeader(ads.CurrentPage, ads.PageSize, ads.TotalCount,ads.TotalPages);
            return Ok(ads);
        }


        [HttpGet("{id}", Name = "GetAd")]
        public async Task<ActionResult<AdDto>> GetAd(int id)
        {
            var ad = await _adRepository.GetAdDtoByIdAsync(id);
            return ad;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAd(int id, AdUpdateDto adDto)
        {
            Ad ad = await _adRepository.GetAdByIdAsync(adDto.Id);
            if (id != ad.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            ad.Name = adDto.Name;
            ad.Description = adDto.Description;
            ad.Quantity = adDto.Quantity;
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
        public async Task<ActionResult<int>> AddAd(AdAddDto adAddDto)
        {
            Ad model = new Ad()
            {
                Name = adAddDto.Name,
                Description = adAddDto.Description,
                Quantity = adAddDto.Quantity,
                ExistsLimit = adAddDto.ExistsLimit,
                IsActive = true,
                Limit = adAddDto.Limit,
                UserId = adAddDto.UserId,
                UnitOfMeasureId = adAddDto.UnitOfMeasureId,
                CategoryId = adAddDto.CategoryId
            };
            _adRepository.AddAd(model);
            if (await _adRepository.SaveAllAsync()){

                Console.WriteLine(model.Id);
                return model.Id;
            } 
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

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int id, IFormFile file)
        {
            Ad ad = await _adRepository.GetAdByIdAsync(id);

            var result = await _cloudinaryPhotoService.AddCloudinaryPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                AdId = id
            };
            

            _photoRepository.AddPhoto(photo);

            if (await _photoRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetAd", new { id = ad.Id }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Fotografia nu a putut fi adaugata");
        }

        [HttpDelete("delete-photo/{adId}/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int adId, int photoId)
        {
            Ad ad = await _adRepository.GetAdByIdAsync(adId);

            Photo photo =await _photoRepository.GetPhotoById(photoId);

            if (photo == null)
            {
                return NotFound();
            }
            if (photo.PublicId != null)
            {
                var result = await _cloudinaryPhotoService.DeleteCloudinaryPhotoAsync(photo.PublicId);
                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
            }

            _photoRepository.DeletePhoto(photo);

            if (await _photoRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Fotografia nu a putut fi stearsa");
        }

        [HttpPut("set-main-photo/{adId}/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int adId, int photoId)
        {
            Ad ad = await _adRepository.GetAdByIdAsync(adId);
            Photo photo = await _photoRepository.GetPhotoById(photoId);

            Photo mainPhoto  = await _photoRepository.GetMainPhotoForAd(ad.Id);
            if (mainPhoto != null)
            {
                mainPhoto.IsMain = false;
            }
            photo.IsMain = true;

            if (await _adRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Fotografia nu a putut fi setata ca find principala");
        }

    }
}