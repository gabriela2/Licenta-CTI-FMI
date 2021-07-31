using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Repositories.CategoryRepository
{
    public interface ICategoryRepository
    {
        void Update(Category category);
        void Delete(Category category);
        void AddCategory(Category category);
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
        Task<CategoryDto> GetCategoryByIdAsync(int id);
        Task<Category> GetCategoryDtoByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}