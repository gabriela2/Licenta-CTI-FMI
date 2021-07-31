using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
        }

        public async Task<MemberDto> GetMemberAsync(int id)
        {
            return await _context.Users.Where(user => user.Id == id ).ProjectTo<MemberDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Include(p=>p.Photo).SingleOrDefaultAsync(user => user.UserName == username);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.Include(p=>p.Photo).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}