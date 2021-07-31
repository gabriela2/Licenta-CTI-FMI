using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
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

        public async Task<IEnumerable<AdDto>> GetAdsAsync()
        {
            return await _context.Ads.ProjectTo<AdDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void UpdateAd(Ad ad)
        {
            _context.Entry(ad).State = EntityState.Modified;
        }

        public async Task<IEnumerable<AdDto>> GetAdsDtoByUserIdAsync(int id)
        {
            return await _context.Ads.Where(ad => ad.Id == id).ProjectTo<AdDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public void AddAd(Ad ad)
        {
            _context.Ads.Add(ad);
        }
    }
}