using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.PhotoRepository
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        public PhotoRepository(DataContext context)
        {
            _context = context;

        }

        public void AddPhoto(Photo photo)
        {
            _context.Photos.Add(photo);
        }

        public void DeletePhoto(Photo photo)
        {
            _context.Photos.Remove(photo);
        }

        public async Task<Photo> GetMainPhotoForAd(int id)
        {
             return await _context.Photos.Where(photo => photo.AdId ==id && photo.IsMain==true).SingleOrDefaultAsync();
        }

        public async Task<Photo> GetPhotoById(int id)
        {
            return await _context.Photos.Where(photo => photo.Id ==id).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}