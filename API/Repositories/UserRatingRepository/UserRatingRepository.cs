using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.UserRatingRepository
{
    public class UserRatingRepository : IUserRatingRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UserRatingRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddUserRating(UserRating userRating)
        {
            _context.UserRatings.Add(userRating);
        }


        public async Task<UserRating> GetUserRatingAsync(int id)
        {
            return await _context.UserRatings.Where(userRating => userRating.Id == id).SingleOrDefaultAsync();
        }

        public async Task<UserRatingDto> GetUserRatingDtoAsync(int id)
        {
            return await _context.UserRatings.Where(userRating => userRating.Id == id).ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();

        }

        public async Task<IEnumerable<UserRatingDto>> GetUserRatingsAsync()
        {
           return await _context.UserRatings.ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<IEnumerable<UserRatingDto>> GetUserRatingsByReceiverIdAsync(int id)
        {
            return await _context.UserRatings.Where(userRating => userRating.ReceiverId == id).ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).ToListAsync();
            
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void UpdateUserRating(UserRating userRating)
        {
             _context.Entry(userRating).State = EntityState.Modified;
        }
    }
}