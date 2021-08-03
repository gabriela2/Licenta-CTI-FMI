using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.AddressRepository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AddressRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddAddress(Address address)
        {
            _context.Addresses.Add(address);
        }

        public async Task<Address> GetAddressByIdAsync(int id)
        {
           return await _context.Addresses.Where(address => address.Id==id).SingleOrDefaultAsync();
        }

        public async Task<AddressDto> GetAddressDtoByIdAsync(int id)
        {
            return await _context.Addresses.Where(address => address.Id==id).ProjectTo<AddressDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<AddressDto> GetAddressDtoByUserIdAsync(int id)
        {
            return await _context.Addresses.Where(address => address.UserId==id).ProjectTo<AddressDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AddressDto>> GetAddressesAsync()
        {
            return await _context.Addresses.ProjectTo<AddressDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void UpdateAddress(Address address)
        {
            _context.Entry(address).State = EntityState.Modified;
        }
    }
}