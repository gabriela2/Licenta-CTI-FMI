using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.DonationRepository
{
    public class DonationRepository : IDonationRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public DonationRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddDonation(Donation donation)
        {
            _context.Donations.Add(donation);
        }


        public async Task<Donation> GetDonationByIdAsync(int id)
        {
            return await _context.Donations.Where(donation => donation.Id==id).SingleOrDefaultAsync();
        }

        public async Task<DonationDto> GetDonationDtoByIdAsync(int id)
        {
            return await _context.Donations.Where(donation => donation.Id==id).ProjectTo<DonationDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<DonationDto>> GetDonationsAsync()
        {
           return await _context.Donations.ProjectTo<DonationDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

    }
}