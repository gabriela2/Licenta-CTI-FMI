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

namespace API.Repositories.AdRepository
{
    public class AdRepository : IAdRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AdRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void DeleteAd(Ad ad)
        {
            _context.Ads.Remove(ad);
        }

        public async Task<AdDto> GetAdDtoByIdAsync(int id)
        {
            return await _context.Ads.Where(ad => ad.Id == id).ProjectTo<AdDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<Ad> GetAdByIdAsync(int id)
        {
            return await _context.Ads.Where(ad => ad.Id == id).SingleOrDefaultAsync();
        }

        public async Task<AdDto> GetAdByNameAsync(string name)
        {
            return await _context.Ads.Where(ad => ad.Name == name).ProjectTo<AdDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<PagedList<AdDto>> GetAdsAsync(AdsParams adsParams)
        {
            var query =  _context.Ads.AsQueryable();
            query = query.Where(ad => ad.IsActive == true);
            if(adsParams.CategoryId!=null){
            query = query.Where(ad => ad.CategoryId == adsParams.CategoryId);
            }
            query = adsParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<AdDto>.CreateAsync(query.ProjectTo<AdDto>(_mapper.ConfigurationProvider).AsNoTracking(), adsParams.PageNumber,adsParams.PageSize);
        }

        public async Task<PagedList<AdDto>> GetActiveAdsByUserIdAsync(AdsParams adsParams, int id)
        {
            var query =  _context.Ads.AsQueryable();
            query = query.Where(ad => ad.IsActive == true);
            query = query.Where(ad => ad.UserId == id );

            if(adsParams.CategoryId!=null){
            query = query.Where(ad => ad.CategoryId == adsParams.CategoryId);
            }
            query = adsParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<AdDto>.CreateAsync(query.ProjectTo<AdDto>(_mapper.ConfigurationProvider).AsNoTracking(), adsParams.PageNumber,adsParams.PageSize);
        }

        public async Task<PagedList<AdDto>> GetInactiveAdsByUserIdAsync(AdsParams adsParams, int id)
        {
            var query =  _context.Ads.AsQueryable();
            query = query.Where(ad => ad.IsActive == false);
            query = query.Where(ad => ad.UserId == id );

            if(adsParams.CategoryId!=null){
            query = query.Where(ad => ad.CategoryId == adsParams.CategoryId);
            }
            query = adsParams.OrderBy switch {
                "newest" => query.OrderBy(ad =>ad.CreatedAt),
                "oldest" => query.OrderByDescending(ad=>ad.CreatedAt),
                _ => query
            };

            return await PagedList<AdDto>.CreateAsync(query.ProjectTo<AdDto>(_mapper.ConfigurationProvider).AsNoTracking(), adsParams.PageNumber,adsParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void UpdateAd(Ad ad)
        {
            _context.Entry(ad).State = EntityState.Modified;
        }
        
        public void AddAd(Ad ad)
        {
            _context.Ads.Add(ad);
        }

        public async Task<IEnumerable<AdDto>> GetAdsByUserId(int id)
        {
            return await _context.Ads.Where(ad => ad.UserId==id).ProjectTo<AdDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}