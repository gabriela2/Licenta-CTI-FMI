using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Repositories.UserRepository
{
    public interface IUserRepository
{

        void Update(User user);
        void Delete(User user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByUsernameAsync(string username);
        Task<MemberDto> GetMemberAsync(int id);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        


    }
}