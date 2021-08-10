using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Repositories.UserRatingRepository
{
    public interface IUserRatingRepository
    {
        void AddUserRating(UserRating userRating);
        void UpdateUserRating(UserRating userRating);
        Task<IEnumerable<UserRatingDto>> GetUserRatingsAsync();
        Task<UserRatingDto> GetUserRatingDtoAsync(int id);
        Task<UserRating> GetUserRatingAsync(int id);
    
        Task<PagedList<UserRatingDto>> GetUserRatingsByReceiverIdAsync(RatingsParams ratingsParams, int id);
        Task<IEnumerable<UserRatingDto>> GetUserRatingsByReceiverIdWihoutPagAsync(int id);
        Task<bool> SaveAllAsync();
        
        
    }
}