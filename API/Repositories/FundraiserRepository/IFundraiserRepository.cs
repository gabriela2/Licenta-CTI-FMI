using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Repositories.FundraiserRepository
{
    public interface IFundraiserRepository
    {
        void UpdateFundraiser(Fundraiser fundraiser);
        void AdFundraiser(Fundraiser fundraiser);
        void DeleteFundraiser(Fundraiser fundraiser);
        Task<PagedList<FundraiserDto>> GetFundraisersAsync(AppParams appParams);
        Task<PagedList<FundraiserDto>> GetActiveFundraisersByUserIdAsync(AppParams appParams,int id);
        Task<PagedList<FundraiserDto>> GetInactiveFundraisersByUserIdAsync(AppParams appParams, int id);
        Task<PagedList<FundraiserDto>> GetRejectedFundraisersByUserIdAsync(AppParams appParams, int id);
        Task<IEnumerable<FundraiserDto>> GetFundraisersByUserIdAsync(int id);
        Task<FundraiserDto> GetFundraiserDtoByIdAsync(int id);
        Task<Fundraiser> GetFundraiserByIdAsync(int id);
        Task<bool> SaveAllAsync();

    }
}