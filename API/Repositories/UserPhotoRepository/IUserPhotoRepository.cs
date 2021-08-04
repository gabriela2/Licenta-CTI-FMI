using System.Threading.Tasks;
using API.Entities;

namespace API.Repositories.UserPhotoRepository
{
    public interface IUserPhotoRepository
    {
        void AdUserPhoto(UserPhoto userPhoto );
        void DeleteUserPhoto(UserPhoto userPhoto);
        Task<bool> SaveAllAsync();
        

    }
}