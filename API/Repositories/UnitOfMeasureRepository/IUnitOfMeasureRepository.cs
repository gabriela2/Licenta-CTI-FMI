using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.UnitOfMeasureRepository
{
    public interface IUnitOfMeasureRepository
    {
        void UpdateUnitOfMeasure(UnitOfMeasure unitOfMeasure);
        void DeleteUnitOfMeasure(UnitOfMeasure unitOfMeasure);
        void AddUnitOfMeasure(UnitOfMeasure unitOfMeasure);
        Task<IEnumerable<UnitOfMeasureDto>> GetUnitsOfMeasureAsync();
        Task<UnitOfMeasure> GetUnitOfMeasureByIdAsync(int id);
        Task<UnitOfMeasureDto> GetUnitOfMeasureDtoByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}