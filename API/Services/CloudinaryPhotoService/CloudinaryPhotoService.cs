using System.Threading.Tasks;
using API.Helpers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services.CloudinaryPhotoService
{
    public class CloudinaryPhotoService : ICloudinaryPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public CloudinaryPhotoService(IOptions<CloudinaryKeys> config)
        {
            var account = new Account( config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> AddCloudinaryPhotoAsync(IFormFile formFile)
        {
            var imageUploadResult = new ImageUploadResult();

            if (formFile.Length > 0)
            {
                using var openReadStream = formFile.OpenReadStream();
                var imageUploadParams = new ImageUploadParams
                {
                    File = new FileDescription(formFile.FileName, openReadStream)
                };
                imageUploadResult = await _cloudinary.UploadAsync(imageUploadParams);
            }

            return imageUploadResult;
        }

        public async Task<DeletionResult> DeleteCloudinaryPhotoAsync(string publicId)
        {
            var image = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(image);
            return result;
        }
    }
}