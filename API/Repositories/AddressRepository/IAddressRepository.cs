using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.AddressRepository
{
    public interface IAddressRepository
    {
        void UpdateAddress(Address address);
        void AddAddress(Address address);
        Task<IEnumerable<AddressDto>> GetAddressesAsync();
        Task<Address> GetAddressByIdAsync(int id);
        Task<AddressDto> GetAddressDtoByIdAsync(int id);
        Task<AddressDto> GetAddressDtoByUserIdAsync(int id);
        Task<bool> SaveAllAsync();
        
        
    }
}