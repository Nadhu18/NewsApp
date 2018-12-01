using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace server
{
    public partial class Startup
    {
        public void ConfigureJwtAuthService(IConfiguration Configuration, IServiceCollection services)
        {
            var audienceConfig = Configuration.GetSection("Audience");
            var symmetricKeyAsBase64 = audienceConfig["Secret"];
            var keyByteArray = Encoding.ASCII.GetBytes(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);

            var tokenValidationParameters = new TokenValidationParameters
            {
                //The signing key must match
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                //validate the JWT issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = audienceConfig["Iss"],

                //validate the JWT audience (aud) claim
                ValidateAudience = true,
                ValidAudience = audienceConfig["Aud"],

                //validate the token expiry
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o => { o.TokenValidationParameters = tokenValidationParameters; });
        }
    }
}

