using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.AdRepository
{
    public interface IAdRepository
    {
        void AddAd(Ad ad);
        void UpdateAd(Ad ad);
        void DeleteAd(Ad ad);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AdDto>> GetAdsAsync();
        Task<AdDto> GetAdDtoByIdAsync(int id);
        Task<Ad> GetAdByIdAsync(int id);
        Task<AdDto> GetAdByNameAsync(string name);
         Task<IEnumerable<AdDto>> GetAdsDtoByUserIdAsync(int id);
        

    }
}