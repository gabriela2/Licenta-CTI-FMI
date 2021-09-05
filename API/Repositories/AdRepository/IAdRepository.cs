using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Repositories.AdRepository
{
    public interface IAdRepository
    {
        void AddAd(Ad ad);
        void UpdateAd(Ad ad);
        void DeleteAd(Ad ad);
        Task<bool> SaveAllAsync();
        Task<PagedList<AdDto>> GetAdsAsync(AdsParams adsParams);
        Task<PagedList<AdDto>> GetInactiveAdsByUserIdAsync(AdsParams adsParams, int id);
        Task<PagedList<AdDto>> GetActiveAdsByUserIdAsync(AdsParams adsParams, int id);
        Task<PagedList<AdDto>> GetNotApprovedYetAdsByUserIdAsync(AdsParams adsParams, int id);
        Task<PagedList<AdDto>> GetRejectedAdsByUserIdAsync(AdsParams adsParams, int id);
        Task<PagedList<AdDto>> GetAllInactiveAdsAsync(AdsParams adsParams);
        Task<AdDto> GetAdDtoByIdAsync(int id);
        Task<Ad> GetAdByIdAsync(int id);
        Task<IEnumerable<AdDto>> GetAdsByUserId(int id);
        

    }
}