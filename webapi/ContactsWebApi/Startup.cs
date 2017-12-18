using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsWebApi.Repositories;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ContactsWebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ContactsWebApi
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
            // var connection = @"Server=DKO-S010A-015\SQLEXPRESS;Database=EFGetStarted.AspNetCore.NewDb;Trusted_Connection=True;";
            var connection = @"Server=tcp:mipo91.database.windows.net,1433; Initial Catalog = contactsdb; Persist Security Info = False; User ID=mipo91; Password=Koulu123; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30;";
            services.AddDbContext<ContactContext>(options => options.UseSqlServer(connection));

            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IContactRepository, ContactRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.Configure<AzureSettings>(Configuration.GetSection("AzureSettings"));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Audience = Configuration["AzureSettings:ApplicationId"];
                options.Authority = "https://login.windows.net/6aaedfdf-2220-4fef-8c57-cafb836bab5a/oauth2/token";
            });

            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddCors(o => o.AddPolicy("ContactsAppPolicy", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
           // app.UseAuthentication();
            app.UseCors("ContactsAppPolicy");
            app.UseMvc();
        }
    }
}
