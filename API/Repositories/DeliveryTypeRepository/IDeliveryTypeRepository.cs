using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.DeliveryTypeRepository
{
    public interface IDeliveryTypeRepository
    {
        void UpdateDeliveryType(DeliveryType deliveryType );
        void DeleteDeliveryType(DeliveryType deliveryType);
        void AddDeliveryType(DeliveryType deliveryType);
        Task<IEnumerable<DeliveryTypeDto>> GetDeliveryTypesAsync();
        Task<DeliveryType> GetDeliveryTypeByIdAsync(int id);
        Task<DeliveryTypeDto> GetDeliveryTypeDtoByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}