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

namespace API.Repositories.FavouriteListRepository
{
    public class FavouriteListRepository : IFavouriteListRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FavouriteListRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AdToFavouriteList(FavouriteList favouriteList)
        {
            _context.FavouriteList.Add(favouriteList);
        }

        public void DeleteFromFavouriteList(FavouriteList favouriteList)
        {
            _context.FavouriteList.Remove(favouriteList);
        }

        public async Task<FavouriteListDto> GetFavouriteAdAsync(int userId, int adId)
        {
            return await _context.FavouriteList.Where(favouriteList => favouriteList.AdId == adId).Where(favouriteList => favouriteList.UserId == userId).ProjectTo<FavouriteListDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<FavouriteListDto> GetFavouriteFundraiserAsync(int userId, int fundraiserId)
        {
            return await _context.FavouriteList.Where(favouriteList => favouriteList.FundraiserId == fundraiserId).Where(favouriteList => favouriteList.UserId == userId).ProjectTo<FavouriteListDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<FavouriteList> GetFavouriteListByIdAsync(int id)
        {
            return await _context.FavouriteList.Where(favouriteList => favouriteList.Id == id).SingleOrDefaultAsync();
        }

        public async Task<PagedList<FavouriteListDto>> GetFavouriteListsByUserIdAsync(AppParams appParams, int id)
        {
            var query = _context.FavouriteList.AsQueryable();
            query = query.Where(donation => donation.UserId == id);

            return await PagedList<FavouriteListDto>.CreateAsync(query.ProjectTo<FavouriteListDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber, appParams.PageSize);

        }

        public async Task<IEnumerable<FavouriteListDto>> GetFavouriteListsDtoByUserIdAsync(int id)
        {
            return await _context.FavouriteList.Where(favouriteList => favouriteList.UserId == id).ProjectTo<FavouriteListDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}