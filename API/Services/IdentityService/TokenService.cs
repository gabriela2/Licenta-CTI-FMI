using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
     
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
            };

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