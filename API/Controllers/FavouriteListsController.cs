using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.FavouriteListRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavouriteListsController : ControllerBase
    {
        private readonly IFavouriteListRepository _favouriteListRepository;
        public FavouriteListsController(IFavouriteListRepository favouriteListRepository)
        {
            _favouriteListRepository = favouriteListRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddToFavouriteList(FavouriteListDto favouriteListDto)
        {
            FavouriteList model = new FavouriteList(){
                UserId=favouriteListDto.UserId,
                AdId = favouriteListDto.AdId,
                FundraiserId = favouriteListDto.FundraiserId
            };
            _favouriteListRepository.AdToFavouriteList(model);
             if(await _favouriteListRepository.SaveAllAsync())return NoContent();
            return BadRequest("Inregistrarea nu a putut fi adaugata");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFromFavouriteList(int id)
        {
            FavouriteList favouriteList = await _favouriteListRepository.GetFavouriteListByIdAsync(id);
            if(favouriteList==null)
            {
                return NotFound();
            }
            _favouriteListRepository.DeleteFromFavouriteList(favouriteList);
            if(await _favouriteListRepository.SaveAllAsync())return NoContent();
            return BadRequest("Inregistrarea nu a putut fi stearsa");

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<FavouriteListDto>>> GetFavouriteListByUserId(int id)
        {
            var favouriteList = await _favouriteListRepository.GetFavouriteListsDtoByUserIdAsync(id);
            return Ok(favouriteList);
        }

        [HttpGet("get-ad/{userId}/{adId}")]
        public async Task<ActionResult<FavouriteListDto>> GetFavouriteAd(int userId, int adId)
        {
            var favouriteAd = await _favouriteListRepository.GetFavouriteAdAsync(userId,adId);
            return favouriteAd;
        }


        [HttpGet("get-fundraiser/{userId}/{fundraiserId}")]
        public async Task<ActionResult<FavouriteListDto>> GetFavouriteFundraiser(int userId, int fundraiserId)
        {
            var favouriteFundraiser = await _favouriteListRepository.GetFavouriteFundraiserAsync(userId,fundraiserId);
            return favouriteFundraiser;
        }
    }
}