using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Services.CloudinaryPhotoService
{
    public interface ICloudinaryPhotoService
    {
        Task<ImageUploadResult> AddCloudinaryPhotoAsync(IFormFile file);
        Task<DeletionResult> DeleteCloudinaryPhotoAsync(string publicId);
    }
}