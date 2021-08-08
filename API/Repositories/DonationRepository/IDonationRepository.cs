using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.DonationRepository
{
    public interface IDonationRepository
    {
        
        void AddDonation(Donation donation);
        Task<IEnumerable<DonationDto>> GetDonationsAsync();
        Task<IEnumerable<DonationDto>> GetDonationsByUserId(int id);
        Task<Donation> GetDonationByIdAsync(int id);
        Task<DonationDto> GetDonationDtoByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}