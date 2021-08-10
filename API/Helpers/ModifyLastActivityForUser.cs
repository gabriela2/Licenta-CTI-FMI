using System;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Repositories.UserRepository;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace API.Helpers
{
    public class ModifyLastActivityForUser : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {

            var resultContext =await next();
            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;
            var userRepository = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await userRepository.GetUserByIdAsync(int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value));
            user.LastActivity = DateTime.Now;
            await userRepository.SaveAllAsync();
        }
    }
}