using AuthSever.Data.Persistence;
using AuthSever.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AuthServer
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        //public Startup(IConfiguration configuration)
        //{
        //    Configuration = configuration;
        //}

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectString = Environment.GetEnvironmentVariable("SQLSERVER_AUTH");
            if (connectString == null)
            {
                connectString = Configuration.GetConnectionString("AuthServerForNews");
            }

            services.AddDbContext<UsersDbContext>(options => options.UseSqlServer(connectString));
            services.AddOptions();
            services.AddCors();
            services.AddScoped<IUsersDbContext, UsersDbContext>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenGenerator, TokenGenerator>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddMvc();

            var option = new DbContextOptionsBuilder<UsersDbContext>().UseSqlServer(connectString).Options;
            using (var dbContext = new UsersDbContext(option))
            {
                dbContext.Database.EnsureCreated();
            }
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

            app.UseMvc();
        }
    }
}
