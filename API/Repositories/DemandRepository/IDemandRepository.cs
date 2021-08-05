using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.DemandRepository
{
    public interface IDemandRepository
    {
        void UpdateDemand(Demand demand);
        void DeleteDemand(Demand demand);
        void AddDemand(Demand demand);
        Task<IEnumerable<DemandDto>> GetDemandsAsync();
        Task<IEnumerable<DemandDto>> GetDemandsByUserIdAsync(int id);
        Task<IEnumerable<DemandDto>> GetDemandsByAdIdAsync(int id);
        Task<Demand> GetDemandByIdAsync(int id);
        Task<DemandDto> GetDemandDtoByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}