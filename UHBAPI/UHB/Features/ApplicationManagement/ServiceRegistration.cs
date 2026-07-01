namespace UHB.Features.ApplicationManagement.Services;

public static class ServiceRegistration
{
    public static void RegisterApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IApplicationService, ApplicationService>();
    }
}
