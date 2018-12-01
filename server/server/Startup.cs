using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Http;
using server.Data.Persistence;
using server.Services;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;

namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Environment.GetEnvironmentVariable("SQLSERVER_MOVIE");
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = Configuration.GetConnectionString("NewsAppByRohithDB");
            }


            services.AddDbContext<NewsDbContext>(options => options.UseSqlServer(connectionString));

            services.AddMvc();
            services.AddScoped<INewsDbContext, NewsDbContext>();
            services.AddScoped<INewsRepository, NewsRepository>();
            services.AddScoped<IFavoriteService, FavoriteService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            var httpClient = new HttpClient();
            services.AddSingleton(httpClient);

            services.AddOptions();

            var option = new DbContextOptionsBuilder<NewsDbContext>().UseSqlServer(connectionString).Options;
            using (var dbContext = new NewsDbContext(option))
            {
                dbContext.Database.EnsureCreated();
            }

            services.AddSwaggerGen(swagGen =>
            {
                swagGen.SwaggerDoc("v1", new Info
                {
                    Title = "News App API",
                    Version = "v1",
                    Description = "News App API developed in ASP.NET Core."
                });
                swagGen.DescribeAllEnumsAsStrings();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyHeader()
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowCredentials());

            app.UseAuthentication();
            app.UseMvc();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
            });
        }
    }
}
