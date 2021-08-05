using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.DemandRepository
{
    public class DemandRepository : IDemandRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DemandRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddDemand(Demand demand)
        {
            _context.Demands.Add(demand);
        }

        public void DeleteDemand(Demand demand)
        {
            _context.Demands.Remove(demand);
        }

        public async Task<Demand> GetDemandByIdAsync(int id)
        {
            return await _context.Demands.Where(demand =>demand.Id == id).SingleOrDefaultAsync();
        }

        public async Task<DemandDto> GetDemandDtoByIdAsync(int id)
        {
            return await _context.Demands.Where(demand => demand.Id==id).ProjectTo<DemandDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<DemandDto>> GetDemandsAsync()
        {
            return await _context.Demands.ProjectTo<DemandDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<IEnumerable<DemandDto>> GetDemandsByAdIdAsync(int id)
        {
            return await _context.Demands.Where(demand => demand.AdId==id).ProjectTo<DemandDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<IEnumerable<DemandDto>> GetDemandsByUserIdAsync(int id)
        {
            return await _context.Demands.Where(demand => demand.UserId==id).ProjectTo<DemandDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void UpdateDemand(Demand demand)
        {
            _context.Entry(demand).State = EntityState.Modified;
        }
    }
}