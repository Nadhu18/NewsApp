using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthSever.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        public string GetJWTToken(string userId)
        {
            //setting claims for the user credential name
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.UniqueName, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            //defining the security key and encoding the claim
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret_newsapp_jwt"));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //defining the JWT token
            var token = new JwtSecurityToken(
                issuer: "AuthServer",
                audience: "newsapp",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: cred
                );

            //defining the response of the token
            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            };

            //converting into json by serializing the response
            return JsonConvert.SerializeObject(response);

        }
    }
}
