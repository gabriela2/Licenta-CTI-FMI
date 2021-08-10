using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Repositories.DemandRepository
{
    public interface IDemandRepository
    {
        void UpdateDemand(Demand demand);
        void DeleteDemand(Demand demand);
        void AddDemand(Demand demand);
        Task<IEnumerable<DemandDto>> GetDemandsAsync();
        Task<PagedList<DemandDto>> GetApprovedDemandsByUserIdAsync(AppParams appParams, int id);
        Task<PagedList<DemandDto>> GetNotApprovedYetDemandsByUserIdAsync(AppParams appParams, int id);
        Task<PagedList<DemandDto>> GetRejectedDemandsByUserIdAsync(AppParams appParams, int id);
        Task<PagedList<DemandDto>> GetUnapprovedDemandsByAdIdAsync(AppParams appParams, int id);
        Task<PagedList<DemandDto>> GetAllDemandsByAdIdAsync(DemandsParams demandsParams, int id);

        Task<Demand> GetDemandByIdAsync(int id);
        Task<DemandDto> GetDemandDtoByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}