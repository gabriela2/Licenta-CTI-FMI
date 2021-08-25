using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Repositories.CategoryRepository;
using API.Repositories.DeliveryTypeRepository;
using API.Repositories.FundraiserRepository;
using API.Repositories.UnitOfMeasureRepository;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IDeliveryTypeRepository _deliveryTypeRepository;
        private readonly IUnitOfMeasureRepository _unitOfMeasureRepository;
        private readonly IFundraiserRepository _fundraiserRepository;
        public AdminController(
            DataContext context, 
            ICategoryRepository categoryRepository, 
            IDeliveryTypeRepository deliveryTypeRepository, 
            IUnitOfMeasureRepository unitOfMeasureRepository,
            IFundraiserRepository fundraiserRepository)
        {
            _fundraiserRepository = fundraiserRepository;
            _unitOfMeasureRepository = unitOfMeasureRepository;
            _deliveryTypeRepository = deliveryTypeRepository;
            _categoryRepository = categoryRepository;
            _context = context;
        }

        [Authorize(Policy = "AdminRole")]
        [HttpGet("get-roles-for-users")]
        public async Task<ActionResult> GetRolesForUsers()
        {
            var users = await _context.Users.Include(urt => urt.Users_x_RoleTypes).ThenInclude(rt => rt.RoleType).OrderBy(u => u.Id).Select(u => new
            {
                Id = u.Id,
                u.Email,
                u.UserName,
                Roles = u.Users_x_RoleTypes.Select(rt => rt.RoleType.Name).ToList()
            }).ToListAsync();
            return Ok(users);
        }

        [Authorize(Policy = "AdminRole")]
        [HttpPost("edit-user-roles/{id}")]
        public async Task<ActionResult> EditUserRoles(int id, [FromQuery] string roles)
        {
            var newRoles = roles.Split(",").ToArray();
            var user = await _context.Users.Where(user => user.Id == id).SingleOrDefaultAsync();
            if (user == null)
            {
                return NotFound("Userul nu exista");
            }
            var existingRoles = await _context.Users.Where(user => user.Id == id).Include(urt => urt.Users_x_RoleTypes).ThenInclude(rt => rt.RoleType).OrderBy(u => u.Id).Select(u => new
            {
                RolesName = u.Users_x_RoleTypes.Select(rt => rt.RoleType.Name).ToArray(),
            }).SingleOrDefaultAsync();
            var allRoles = await _context.RoleTypes.ToListAsync();
            foreach (var item in newRoles.Except(existingRoles.RolesName))
            {
                foreach (var item2 in allRoles)
                {
                    if (item == item2.Name)
                    {
                        _context.Users_X_RoleTypes.Add(new Entities.User_x_RoleType { UserId = id, RoleTypeId = item2.Id });
                    }
                }

            }

            foreach (var item in existingRoles.RolesName.Except(newRoles))
            {
                foreach (var item2 in allRoles)
                {
                    if (item == item2.Name)
                    {
                        Entities.User_x_RoleType user_X_RoleType_to_remove= _context.Users_X_RoleTypes.Where(urt => urt.UserId==id && urt.RoleTypeId==item2.Id).SingleOrDefault();
                        _context.Users_X_RoleTypes.Remove(user_X_RoleType_to_remove);
                    }
                }

            }

            await _context.SaveChangesAsync();

            var existingRolesFinal = await _context.Users.Where(user => user.Id == id).Include(urt => urt.Users_x_RoleTypes).ThenInclude(rt => rt.RoleType).OrderBy(u => u.Id).Select(u => new
            {
                RolesName = u.Users_x_RoleTypes.Select(rt => rt.RoleType.Name).ToArray(),
            }).SingleOrDefaultAsync();


            return Ok(existingRolesFinal);



        }
        [Authorize(Policy = "AdminRole")]
        [HttpPut("category/{id}")]
        public async Task<ActionResult> UpdateCategory(int id, CategoryDto categoryDto)
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

        [Authorize(Policy = "AdminRole")]
        [HttpPost("category")]
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

        [Authorize(Policy = "AdminRole")]
        [HttpDelete("category/{id}")]
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

        [Authorize(Policy = "AdminRole")]
        [HttpPut("delivery-type/{id}")]
        public async Task<ActionResult> UpdateDeliveryType(int id, DeliveryTypeDto deliveryTypeDto)
        {
            DeliveryType deliveryType = await _deliveryTypeRepository.GetDeliveryTypeByIdAsync(deliveryTypeDto.Id);
            if (id != deliveryType.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }
            deliveryType.Description = deliveryTypeDto.Description;
            deliveryType.Name = deliveryTypeDto.Name;
            deliveryType.Price = deliveryTypeDto.Price;
            _deliveryTypeRepository.UpdateDeliveryType(deliveryType);
            if (await _deliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("DeliveryType-ul nu a putut fi actualizat");
        }


        [Authorize(Policy = "AdminRole")]
        [HttpPost("delivery-type")]
        public async Task<ActionResult> AddDeliveryType(DeliveryTypeDto deliveryTypeDto)
        {
            DeliveryType model = new DeliveryType()
            {
                Name = deliveryTypeDto.Name,
                Description = deliveryTypeDto.Description,
                Price = deliveryTypeDto.Price
            };
            _deliveryTypeRepository.AddDeliveryType(model);
            if (await _deliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("DeliveryType-ul nu a putut fi adaugat");

        }

        [Authorize(Policy = "AdminRole")]
        [HttpDelete("delivery-type/{id}")]
        public async Task<ActionResult> DeleteDeliveryType(int id)
        {
            var deliveryType = await _deliveryTypeRepository.GetDeliveryTypeByIdAsync(id);
            if (deliveryType == null)
            {
                return NotFound();
            }
            _deliveryTypeRepository.DeleteDeliveryType(deliveryType);
            if (await _deliveryTypeRepository.SaveAllAsync()) return NoContent();
            return BadRequest("DeliveryType-ul nu a putut fi sters");

        }

        [Authorize(Policy = "AdminRole")]
        [HttpPut("unit-of-measure/{id}")]
        public async Task<ActionResult> UpdateUnitOfMeasure(int id, UnitOfMeasureDto unitOfMeasureDto)
        {
            UnitOfMeasure unitOfMeasure = await _unitOfMeasureRepository.GetUnitOfMeasureByIdAsync(unitOfMeasureDto.Id);
            if (id != unitOfMeasure.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }

            unitOfMeasure.Name = unitOfMeasureDto.Name;
            unitOfMeasure.Description = unitOfMeasureDto.Description;
            unitOfMeasure.Abbreviation = unitOfMeasureDto.Abbreviation;
            _unitOfMeasureRepository.UpdateUnitOfMeasure(unitOfMeasure);
            if (await _unitOfMeasureRepository.SaveAllAsync()) return NoContent();
            return BadRequest("UnitOfMeasure-ul nu a putut fi actualizat");

        }

        [Authorize(Policy = "AdminRole")]
        [HttpPost("unit-of-measure")]
        public async Task<ActionResult> AddUnitOfMeasure(UnitOfMeasureDto unitOfMeasureDto)
        {
            UnitOfMeasure model = new UnitOfMeasure()
            {
                Name = unitOfMeasureDto.Name,
                Description = unitOfMeasureDto.Description,
                Abbreviation = unitOfMeasureDto.Abbreviation,
            };
            _unitOfMeasureRepository.AddUnitOfMeasure(model);
            if (await _unitOfMeasureRepository.SaveAllAsync()) return NoContent();
            return BadRequest("UnitOfMeasure-ul nu a putut fi adaugat");

        }

        [Authorize(Policy = "AdminRole")]
        [HttpDelete("unit-of-measure/{id}")]
        public async Task<ActionResult> DeleteUnitOfMeasure(int id)
        {
            var unitOfMeasure = await _unitOfMeasureRepository.GetUnitOfMeasureByIdAsync(id);
            if (unitOfMeasure == null) { return NotFound(); }
            _unitOfMeasureRepository.DeleteUnitOfMeasure(unitOfMeasure);
            if (await _unitOfMeasureRepository.SaveAllAsync()) return NoContent();
            return BadRequest("UnitOfMeasure-ul nu a putut fi sters");
        }



        [Authorize(Policy = "ModeratorRole")]
        [HttpGet("get-all-inactive-fundraisers")]
        public async Task<ActionResult> GetAllInactiveFundraisers([FromQuery]AppParams appParams)
        {
            var fundraisers = await _fundraiserRepository.GetAllInactiveFundraisersAsync(appParams);
            Response.AddPaginationHeader(fundraisers.CurrentPage,fundraisers.PageSize,fundraisers.TotalCount, fundraisers.TotalPages);
            return Ok(fundraisers);
        }




    }
}