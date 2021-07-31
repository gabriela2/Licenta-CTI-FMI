using HelpAFamilyOfferAChance.API.Data;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController : ControllerBase
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "this is a text";
        }

        [HttpGet("not-found")]
        public ActionResult<User> GetNotFound()
        {
            var userNull = _context.Users.Find(-1);
            if (userNull == null) return NotFound();
            return Ok(userNull);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var userNull = _context.Users.Find(-1);
            var userToReturn = userNull.ToString();
            return userToReturn; 
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Acest request este nepotrivit");
        }

    }
}