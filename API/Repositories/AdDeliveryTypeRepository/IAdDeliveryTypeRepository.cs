using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.AdDeliveryTypeRepository
{
    public interface IAdDeliveryTypeRepository
    {
        void UpdateAdDeliveryType(Ad_x_DeliveryType ad_X_DeliveryType);
        void DeleteAdDeliveryType(Ad_x_DeliveryType ad_X_DeliveryType);
        void AddAdDeliveryType(Ad_x_DeliveryType ad_X_DeliveryType);
        Task<IEnumerable<Ad_x_DeliveryTypeDto>> GetAdsDeliveryTypesAsync();
        Task<Ad_x_DeliveryType> GetAdDeliveryTypeAsync(int id);
        Task<Ad_x_DeliveryTypeDto> GetAdDeliveryTypeDtoAsync(int id);
        Task<bool> SaveAllAsync();
    }
}