using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
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

        public async Task<PagedList<UserRatingDto>> GetAllInactiveUserRatingsAsync(AppParams appParams)
        {
            var query =  _context.UserRatings.AsQueryable();
            query = query.Where(userRating => userRating.IsRejected== false);
            query = query.Where(UserRating => UserRating.IsValidated==false);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<UserRatingDto>.CreateAsync(query.ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        
        
        }

        public async Task<PagedList<UserRatingDto>> GetApprovedUserRatingsBySenderIdAsync(AppParams appParams, int id)
        {
            var query =  _context.UserRatings.AsQueryable();
            query = query.Where(userRating => userRating.SenderId==id);
            query = query.Where(userRating => userRating.IsRejected== false);
            query = query.Where(UserRating => UserRating.IsValidated==true);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<UserRatingDto>.CreateAsync(query.ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        
        }

        public async Task<PagedList<UserRatingDto>> GetNotApprovedYetUserRatingsBySenderIdAsync(AppParams appParams, int id)
        {
             var query =  _context.UserRatings.AsQueryable();
            query = query.Where(userRating => userRating.SenderId==id);
            query = query.Where(userRating => userRating.IsRejected== false);
            query = query.Where(UserRating => UserRating.IsValidated==false);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<UserRatingDto>.CreateAsync(query.ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        
        }

        public async Task<PagedList<UserRatingDto>> GetRejectedUserRatingsBySenderIdAsync(AppParams appParams, int id)
        {
             var query =  _context.UserRatings.AsQueryable();
            query = query.Where(userRating => userRating.SenderId==id);
            query = query.Where(userRating => userRating.IsRejected== true);
            query = query.Where(UserRating => UserRating.IsValidated==true);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<UserRatingDto>.CreateAsync(query.ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        
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

        public async Task<PagedList<UserRatingDto>> GetUserRatingsByReceiverIdAsync(RatingsParams ratingsParams, int id)
        {
            var query =  _context.UserRatings.AsQueryable();
            query = query.Where(userRating => userRating.ReceiverId == id);
            query = query.Where(userRating => userRating.IsRejected== false);
            query = query.Where(UserRating => UserRating.IsValidated==true);
            if(ratingsParams.Rating>0 && ratingsParams.Rating<6 ){
            query = query.Where(userRating => userRating.Rating == ratingsParams.Rating);
            }
            query = ratingsParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<UserRatingDto>.CreateAsync(query.ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).AsNoTracking(), ratingsParams.PageNumber,ratingsParams.PageSize);
        
        }

        public async Task<IEnumerable<UserRatingDto>> GetUserRatingsByReceiverIdWihoutPagAsync(int id)
        {
            return await _context.UserRatings.Where(userRating => userRating.ReceiverId==id).ProjectTo<UserRatingDto>(_mapper.ConfigurationProvider).ToListAsync();
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