using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.UserRatingRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserRatingsController : ControllerBase
    {
        private readonly IUserRatingRepository _userRatingRepository;
        public UserRatingsController(IUserRatingRepository userRatingRepository)
        {
            _userRatingRepository = userRatingRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRatingDto>>> GetUserRatings()
        {
            var userRatings = await _userRatingRepository.GetUserRatingsAsync();
            return Ok(userRatings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserRatingDto>> GetUserRating(int id)
        {
            var userRating = await _userRatingRepository.GetUserRatingDtoAsync(id);
            return userRating;
        }

        [HttpGet("rating-received/{id}")]
        public async Task<ActionResult<IEnumerable<UserRatingDto>>> GetUserRatingReceived(int id)
        {
            var userRating = await _userRatingRepository.GetUserRatingsByReceiverIdAsync(id);
            return Ok(userRating);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUserRating(int id, UserRatingDto userRatingDto)
        {
            UserRating userRating = await _userRatingRepository.GetUserRatingAsync(userRatingDto.Id);
            if(id!= userRating.Id)
            {
               return BadRequest("S-a intamplat ceva neasteptat");
            }

            userRating.Rating =userRatingDto.Rating;
            userRating.Comment=userRatingDto.Comment;
            
            _userRatingRepository.UpdateUserRating(userRating);
            if(await _userRatingRepository.SaveAllAsync())return NoContent();
            return BadRequest("UserRating-ul nu a putut fi actualizat");

        }

        [HttpPost]
        public async Task<ActionResult> AddUserRating(UserRatingDto userRatingDto)
        {
            UserRating model = new UserRating()
            {
                Rating = userRatingDto.Rating,
                Comment=userRatingDto.Comment,
                ReceiverId = userRatingDto.ReceiverId,
                SenderId=userRatingDto.ReceiverId
            };
            _userRatingRepository.AddUserRating(model);
            if(await _userRatingRepository.SaveAllAsync())return NoContent();
            return BadRequest("UserRating-ul nu a putut fi adaugat");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletUserRating(int id)
        {
            var userRating = await _userRatingRepository.GetUserRatingAsync(id);
            if(userRating ==null){return NotFound();}
            _userRatingRepository.DeleteUserRating(userRating);
            if(await _userRatingRepository.SaveAllAsync())return NoContent();
            return BadRequest("UserRating-ul nu a putut fi sters");
        }
    }
}