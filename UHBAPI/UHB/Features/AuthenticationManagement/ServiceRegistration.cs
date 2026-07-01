using UHB.Features.AuthenticationManagement.Services.Authentication.Token;

namespace UHB.Features.AuthenticationManagement.Services;

public static class ServiceRegistration
{
    public static void RegisterApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserManagementService, UserManagementService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
    }
}
