using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.FundraiserRepository
{
    public interface IFundraiserRepository
    {
        void UpdateFundraiser(Fundraiser fundraiser);
        void AdFundraiser(Fundraiser fundraiser);
        void DeleteFundraiser(Fundraiser fundraiser);
        Task<IEnumerable<FundraiserDto>> GetFundraisersAsync();
        Task<IEnumerable<FundraiserDto>> GetFundraisersByUserIdAsync(int id);
        Task<FundraiserDto> GetFundraiserDtoByIdAsync(int id);
        Task<Fundraiser> GetFundraiserByIdAsync(int id);
        Task<bool> SaveAllAsync();

    }
}