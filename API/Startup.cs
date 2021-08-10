using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using API.Middleware;
using API.Repositories.UserRepository;
using API.Services;
using API.Services.MailService;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using API.Helpers;
using API.Repositories.AdRepository;
using API.Repositories.CategoryRepository;
using API.Repositories.DeliveryTypeRepository;
using API.Repositories.UnitOfMeasureRepository;
using API.Repositories.AddressRepository;
using API.Repositories.AdDeliveryTypeRepository;
using API.Entities;
using API.Repositories.DemandRepository;
using API.Repositories.DonationRepository;
using API.Repositories.UserRatingRepository;
using API.Repositories.FundraiserRepository;
using API.Repositories.FavouriteListRepository;
using API.Services.CloudinaryPhotoService;
using API.Repositories.UserPhotoRepository;
using API.Repositories.PhotoRepository;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<StripeKeys>(_config.GetSection("StripePayment"));
            services.Configure<CloudinaryKeys>(_config.GetSection("Cloudinary"));
            services.Configure<EmailSettings>(_config.GetSection("EmailSettings"));
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped<ICloudinaryPhotoService, CloudinaryPhotoService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ModifyLastActivityForUser>();

            services.AddScoped<IAdRepository, AdRepository>();
            services.AddScoped<IUserPhotoRepository, UserPhotoRepository>();
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IDeliveryTypeRepository, DeliveryTypeRepository>();
            services.AddScoped<IUnitOfMeasureRepository, UnitOfMeasureRepository>();
            services.AddScoped<IAdDeliveryTypeRepository, AdDeliveryTypeRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();
            services.AddScoped<IDemandRepository, DemandRepository>();
            services.AddScoped<IFundraiserRepository, FundraiserRepository>();
            services.AddScoped<IDonationRepository, DonationRepository>();
            services.AddScoped<IUserRatingRepository,UserRatingRepository>();
            services.AddScoped<IFavouriteListRepository, FavouriteListRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(_config.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddCors();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
                    ValidateIssuer = false,//usually is the api server
                    ValidateAudience= false,//usually is the angular aplication 
                };
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           // app.UseMiddleware<ExceptionMiddleware>();
              if (env.IsDevelopment())
              {
                  app.UseDeveloperExceptionPage();
                  app.UseSwagger();
                  app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
             }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
