using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.CategoryRepository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CategoryRepository(DataContext context, IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
            
        }
        

        public void AddCategory(Category category)
        {
            _context.Category.Add(category);
        }

        public void Delete(Category category)
        {
            _context.Category.Remove(category);
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
        {
           return await _context.Category.ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id)
        {
            return await _context.Category.Where(category => category.Id ==id).ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public void Update(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Category> GetCategoryDtoByIdAsync(int id)
        {
            return await _context.Category.Where(category => category.Id == id).SingleOrDefaultAsync();
        }
    }
}