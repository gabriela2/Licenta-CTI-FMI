using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Repositories.AddressRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;
        public AddressesController(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressDto>>> GetAddresses()
        {
            var addresses = await _addressRepository.GetAddressesAsync();
            return Ok(addresses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AddressDto>> GetAddress(int id)
        {
            var address = await _addressRepository.GetAddressDtoByIdAsync(id);
            return address;
        }

        [HttpGet("user-address/{id}")]
        public async Task<ActionResult<AddressDto>> GetAddressByUserId(int id)
        {
            var address = await _addressRepository.GetAddressDtoByUserIdAsync(id);
            return address;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatedAddress(int id, AddressDto addressDto)
        {
            Address address = await _addressRepository.GetAddressByIdAsync(addressDto.Id);
            if(id!= address.Id)
            {
                return BadRequest("S-a intamplat ceva neasteptat");
            }
            address.HouseNumber = addressDto.HouseNumber;
            address.Street = addressDto.Street;
            address.City = addressDto.City;
            address.District = addressDto.District;
            address.Country = addressDto.Country;
            address.ZipCode =addressDto.ZipCode;
            _addressRepository.UpdateAddress(address);
            if(await _addressRepository.SaveAllAsync())return NoContent();
            return BadRequest("Adresa by a putut fi actualizata");
        }

        [HttpPost]
        public async Task<ActionResult> AddAddress(AddressDto addressDto)
        {
            Address model = new Address(){
                HouseNumber = addressDto.HouseNumber,
                Street=addressDto.Street,
                City = addressDto.City,
                District= addressDto.District,
                Country = addressDto.Country,
                ZipCode= addressDto.ZipCode,
                UserId= addressDto.UserId
            };
            _addressRepository.AddAddress(model);
             if(await _addressRepository.SaveAllAsync())return NoContent();
            return BadRequest("Adresa by a putut fi adaugata");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAddress(int id)
        {
            var address = await _addressRepository.GetAddressByIdAsync(id);
            if(address==null)
            {
                return NotFound();
            }
            _addressRepository.DeleteAddress(address);
            if(await _addressRepository.SaveAllAsync())return NoContent();
            return BadRequest("Adresa by a putut fi stearsa");

        }



    }
}