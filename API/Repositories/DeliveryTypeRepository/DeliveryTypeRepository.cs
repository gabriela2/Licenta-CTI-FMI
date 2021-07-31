using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.DeliveryTypeRepository
{
    public class DeliveryTypeRepository : IDeliveryTypeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DeliveryTypeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public void AddDeliveryType(DeliveryType deliveryType)
        {
            _context.DeliveryTypes.Add(deliveryType);
        }

        public void DeleteDeliveryType(DeliveryType deliveryType)
        {
            _context.DeliveryTypes.Remove(deliveryType);
        }

        public async Task<IEnumerable<DeliveryTypeDto>> GetDeliveryTypesAsync()
        {
            return await _context.DeliveryTypes.ProjectTo<DeliveryTypeDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<DeliveryType> GetDeliveryTypeByIdAsync(int id)
        {
            return await _context.DeliveryTypes.Where(deliveryType => deliveryType.Id ==id).SingleOrDefaultAsync();
        }

        public async Task<DeliveryTypeDto> GetDeliveryTypeDtoByIdAsync(int id)
        {
             return await _context.DeliveryTypes.Where(deliveryType => deliveryType.Id ==id).ProjectTo<DeliveryTypeDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
             return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateDeliveryType(DeliveryType deliveryType)
        {
            _context.Entry(deliveryType).State = EntityState.Modified;
        }
    }
}
