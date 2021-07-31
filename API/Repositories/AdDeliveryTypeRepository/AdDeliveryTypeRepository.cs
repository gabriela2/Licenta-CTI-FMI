using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.AdDeliveryTypeRepository
{
    public class AdDeliveryTypeRepository : IAdDeliveryTypeRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AdDeliveryTypeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddAdDeliveryType(Ad_x_DeliveryType ad_X_DeliveryType)
        {
            _context.Ads_X_DeliveryTypes.Add(ad_X_DeliveryType);
        }

        public void DeleteAdDeliveryType(Ad_x_DeliveryType ad_X_DeliveryType)
        {
            _context.Ads_X_DeliveryTypes.Remove(ad_X_DeliveryType);
        }

        public async Task<Ad_x_DeliveryType> GetAdDeliveryTypeAsync(int id)
        {
            return await _context.Ads_X_DeliveryTypes.Where(ad_x_deliveryType => ad_x_deliveryType.Id == id).SingleOrDefaultAsync();
        }

        public async Task<Ad_x_DeliveryTypeDto> GetAdDeliveryTypeDtoAsync(int id)
        {
            return await _context.Ads_X_DeliveryTypes.Where(ad_x_deliveryType => ad_x_deliveryType.Id==id).ProjectTo<Ad_x_DeliveryTypeDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Ad_x_DeliveryTypeDto>> GetAdsDeliveryTypesAsync()
        {
            return await _context.Ads_X_DeliveryTypes.ProjectTo<Ad_x_DeliveryTypeDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateAdDeliveryType(Ad_x_DeliveryType ad_X_DeliveryType)
        {
            _context.Entry(ad_X_DeliveryType).State = EntityState.Modified;
        }
    }
}