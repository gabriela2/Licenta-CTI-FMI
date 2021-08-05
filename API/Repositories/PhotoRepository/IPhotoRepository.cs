using System.Threading.Tasks;
using API.Entities;

namespace API.Repositories.PhotoRepository
{
    public interface IPhotoRepository
    {
        void AddPhoto(Photo photo);
        void DeletePhoto(Photo photo);
        Task<bool> SaveAllAsync();
        Task<Photo> GetPhotoById(int id);
        Task<Photo> GetMainPhotoForAd(int id);

        
    }
}