using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Repositories.UserRatingRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [Authorize]
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
        public async Task<ActionResult<IEnumerable<UserRatingDto>>> GetUserRatingReceived([FromQuery]RatingsParams ratingsParams ,int id)
        {
            var userRating = await _userRatingRepository.GetUserRatingsByReceiverIdAsync( ratingsParams, id);
            Response.AddPaginationHeader(userRating.CurrentPage, userRating.PageSize, userRating.TotalCount,userRating.TotalPages);
            return Ok(userRating);
        }


        [HttpGet("rating-received-without-pag/{id}")]
        public async Task<ActionResult<IEnumerable<UserRatingDto>>> GetUserRatingReceivedIdWihout(int id)
        {
            var userRating = await _userRatingRepository.GetUserRatingsByReceiverIdWihoutPagAsync(id);
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
            userRating.Title = userRatingDto.Title;
            userRating.IsValidated = userRatingDto.IsValidated;
            userRating.IsRejected = userRatingDto.IsRejected;

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
                Title=userRatingDto.Title,
                Comment=userRatingDto.Comment,
                ReceiverId = userRatingDto.ReceiverId,
                SenderId=userRatingDto.SenderId,
                IsRejected= false,
                IsValidated=false,

            };
            _userRatingRepository.AddUserRating(model);
            if(await _userRatingRepository.SaveAllAsync())return NoContent();
            return BadRequest("UserRating-ul nu a putut fi adaugat");

        }


        [HttpGet("approved-user-ratings-by-sender-id/{id}")]
        public async Task<ActionResult<IEnumerable<UserRatingDto>>> GetApprovedUserRatingsBySenderId([FromQuery]AppParams appParams ,int id)
        {
            var userRating = await _userRatingRepository.GetApprovedUserRatingsBySenderIdAsync(appParams, id);
            Response.AddPaginationHeader(userRating.CurrentPage, userRating.PageSize, userRating.TotalCount,userRating.TotalPages);
            return Ok(userRating);
        }

        [HttpGet("not-approved-yet-user-ratings-by-sender-id/{id}")]
        public async Task<ActionResult<IEnumerable<UserRatingDto>>> GetNotApprovedYetUserRatingsBySenderId([FromQuery]AppParams appParams ,int id)
        {
            var userRating = await _userRatingRepository.GetNotApprovedYetUserRatingsBySenderIdAsync(appParams, id);
            Response.AddPaginationHeader(userRating.CurrentPage, userRating.PageSize, userRating.TotalCount,userRating.TotalPages);
            return Ok(userRating);
        }

        [HttpGet("rejected-user-ratings-by-sender-id/{id}")]
        public async Task<ActionResult<IEnumerable<UserRatingDto>>> GetRejectedUserRatingsBySenderId([FromQuery]AppParams appParams ,int id)
        {
            var userRating = await _userRatingRepository.GetRejectedUserRatingsBySenderIdAsync(appParams, id);
            Response.AddPaginationHeader(userRating.CurrentPage, userRating.PageSize, userRating.TotalCount,userRating.TotalPages);
            return Ok(userRating);
        }
    }
}