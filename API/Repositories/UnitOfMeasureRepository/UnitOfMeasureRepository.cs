using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.UnitOfMeasureRepository
{
    public class UnitOfMeasureRepository : IUnitOfMeasureRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitOfMeasureRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddUnitOfMeasure(UnitOfMeasure unitOfMeasure)
        {
            _context.UnitsOfMeasure.Add(unitOfMeasure);
        }

        public void DeleteUnitOfMeasure(UnitOfMeasure unitOfMeasure)
        {
            _context.UnitsOfMeasure.Remove(unitOfMeasure);
        }

        public async Task<IEnumerable<UnitOfMeasureDto>> GetUnitsOfMeasureAsync()
        {
            return await _context.UnitsOfMeasure.ProjectTo<UnitOfMeasureDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<UnitOfMeasure> GetUnitOfMeasureByIdAsync(int id)
        {
            return await _context.UnitsOfMeasure.Where(unitOfMeasure => unitOfMeasure.Id == id).SingleOrDefaultAsync();
        }

        public async Task<UnitOfMeasureDto> GetUnitOfMeasureDtoByIdAsync(int id)
        {
            return await _context.UnitsOfMeasure.Where(unitOfMeasure => unitOfMeasure.Id == id).ProjectTo<UnitOfMeasureDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateUnitOfMeasure(UnitOfMeasure unitOfMeasure)
        {
            _context.Entry(unitOfMeasure).State = EntityState.Modified;
        }
    }
}