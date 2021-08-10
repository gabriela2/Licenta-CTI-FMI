using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Repositories.CategoryRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(ModifyLastActivityForUser))]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoriesController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoryRepository.GetCategoriesAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);
            return category;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id,CategoryDto categoryDto)
        {
            Category category = await _categoryRepository.GetCategoryDtoByIdAsync(categoryDto.Id);
            if (id != category.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            category.Description = categoryDto.Description;
            category.Name = categoryDto.Name;

            _categoryRepository.Update(category);
            if (await _categoryRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Categoria nu a putut fi actualizata");
        }

        [HttpPost]
        public async Task<ActionResult> AddCategory(CategoryDto categoryDto)
        {
            Category model = new Category()
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description
            };
            _categoryRepository.AddCategory(model);
            if (await _categoryRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Categoria nu a putut fi adaugata");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _categoryRepository.GetCategoryDtoByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            _categoryRepository.Delete(category);
            if (await _categoryRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Categoria nu a putut fi stearsa");
        }

    }
}