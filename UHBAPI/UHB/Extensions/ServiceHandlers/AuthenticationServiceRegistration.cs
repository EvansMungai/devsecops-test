using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UHB.Domain.Entities;
using UHB.Infrastructure.Persistence;

namespace UHB.Extensions.ServiceHandlers;

public static class AuthenticationServiceRegistration
{
    public static void ConfigureAuthenticationServices(this IServiceCollection services, IConfiguration configuration)
    {
        string? jwtKey = configuration["JWT:Key"];
        string? jwtIssuer = configuration["JWT:Issuer"];
        string? webAudience = configuration["JWT:AUDIENCES:WEB"];
        string? posAudience = configuration["JWT:AUDIENCES:POS"];
        string? mobileAudience = configuration["JWT:AUDIENCES:MOBILE"];

        services.AddIdentity<UserDomain, IdentityRole>().AddEntityFrameworkStores<UhbContext>().AddDefaultTokenProviders();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtIssuer,
                ValidAudiences = new[] { webAudience?.Trim(), posAudience?.Trim(), mobileAudience?.Trim() },
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            };
            options.Events = new JwtBearerEvents
            {
                OnChallenge = async context =>
                {
                    context.HandleResponse();

                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";

                    var response = new
                    {
                        message = "Unauthorized - token is missing or invalid"
                    };

                    await context.Response.WriteAsJsonAsync(response);
                },
                OnForbidden = async context =>
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    context.Response.ContentType = "application/json";

                    var response = new
                    {
                        message = "Forbidden - you do not have permission to access this resource."
                    };
                    await context.Response.WriteAsJsonAsync(response);
                }
            };
        });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("CanAccessApplications", policy => policy.RequireRole("Admin", "Housekeeper"));
            options.AddPolicy("CanAccessAcceptedApplications", policy => policy.RequireRole("Admin", "Housekeeper", "Matron"));
            options.AddPolicy("CanAccessManagement", policy => policy.RequireRole("Admin"));
            options.AddPolicy("CanAccessEverything", policy => policy.RequireRole("Admin", "Housekeeper", "Matron", "Student"));
            options.AddPolicy("CanAccessStudentDetails", policy => policy.RequireRole("Admin", "Student"));

        });
    }
}
