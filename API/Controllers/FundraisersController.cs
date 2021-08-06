using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.FundraiserRepository;
using API.Repositories.PhotoRepository;
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
    public class FundraisersController : ControllerBase
    {
        private readonly IFundraiserRepository _fundraiserRepository;
        private readonly IPhotoRepository _photoRepository;
        private readonly ICloudinaryPhotoService _cloudinaryPhotoService;
        private readonly IMapper _mapper;
        public FundraisersController(IFundraiserRepository fundraiserRepository, IPhotoRepository photoRepository, ICloudinaryPhotoService cloudinaryPhotoService, IMapper mapper)
        {
            _mapper = mapper;
            _cloudinaryPhotoService = cloudinaryPhotoService;
            _photoRepository = photoRepository;
            _fundraiserRepository = fundraiserRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FundraiserDto>>> GetFundraisers()
        {
            var fundraisers = await _fundraiserRepository.GetFundraisersAsync();
            return Ok(fundraisers);
        }

        [HttpGet("{id}",Name ="GetFundraiser")]
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

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int id, IFormFile file)
        {
            Fundraiser fundraiser = await _fundraiserRepository.GetFundraiserByIdAsync(id);

            var result = await _cloudinaryPhotoService.AddCloudinaryPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                FundraiserId = id
            };

            _photoRepository.AddPhoto(photo);

            if (await _photoRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetFundraiser", new { id = fundraiser.Id }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Fotografia nu a putut fi adaugata");
        }

        [HttpDelete("delete-photo/{fundraiserId}/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int fundraiserId, int photoId)
        {
            Fundraiser fundraiser = await _fundraiserRepository.GetFundraiserByIdAsync(fundraiserId);

            Photo photo = await _photoRepository.GetPhotoById(photoId);

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

        [HttpPut("set-main-photo/{fundraiserId}/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int fundraiserId, int photoId)
        {
            Fundraiser fundraiser = await _fundraiserRepository.GetFundraiserByIdAsync(fundraiserId);
            Photo photo = await _photoRepository.GetPhotoById(photoId);

            Photo mainPhoto = await _photoRepository.GetMainPhotoForAd(fundraiser.Id);
            if (mainPhoto != null)
            {
                mainPhoto.IsMain = false;
            }
            photo.IsMain = true;

            if (await _photoRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Fotografia nu a putut fi setata ca find principala");
        }
    }
}