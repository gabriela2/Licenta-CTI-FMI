using System.Threading.Tasks;
using API.Entities;
using HelpAFamilyOfferAChance.API.Data;

namespace API.Repositories.UserPhotoRepository
{
    public class UserPhotoRepository : IUserPhotoRepository
    {
        private readonly DataContext _context;
        public UserPhotoRepository(DataContext context)
        {
            _context = context;
        }

        public void AdUserPhoto(UserPhoto userPhoto)
        {
            _context.UserPhotos.Add(userPhoto);
        }

        public void DeleteUserPhoto(UserPhoto userPhoto)
        {
           _context.UserPhotos.Remove(userPhoto);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() >0;
        }
    }
}