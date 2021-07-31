using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.UserRatingRepository
{
    public interface IUserRatingRepository
    {
        void AddUserRating(UserRating userRating);
        void UpdateUserRating(UserRating userRating);
        void DeleteUserRating(UserRating userRating);

        Task<IEnumerable<UserRatingDto>> GetUserRatingsAsync();
        Task<UserRatingDto> GetUserRatingDtoAsync(int id);
        Task<UserRating> GetUserRatingAsync(int id);
        Task<IEnumerable<UserRatingDto>> GetUserRatingsByReceiverIdAsync(int id);
        Task<bool> SaveAllAsync();
        
        
    }
}