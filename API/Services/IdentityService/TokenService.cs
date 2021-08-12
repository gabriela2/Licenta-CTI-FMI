using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using HelpAFamilyOfferAChance.API.Data;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
     
        private readonly SymmetricSecurityKey _key;
        private readonly DataContext _context;
        public TokenService(IConfiguration config, DataContext context)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            _context=context;
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
            };

            var user_x_roles = _context.Users_X_RoleTypes.Where(item => item.UserId==user.Id).ToList();
            var roles = _context.RoleTypes.ToList();
            var rolesPerUser=new List<string>();
            foreach(var item in user_x_roles){
                foreach(var item2 in roles){
                    if(item.RoleTypeId==item2.Id){
                        rolesPerUser.Add(item2.Name);
                    }
                }
            } 

            claims.AddRange(rolesPerUser.Select(role => new Claim(ClaimTypes.Role, role)));


            var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject =  new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = credentials,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var finalToken = tokenHandler.WriteToken(token);
            return finalToken;


        }
    }
}