namespace UHB.Features.StudentManagement.Services;

public static class ServiceRegistration
{
    public static void RegisterApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IStudentService, StudentService>();
    }
}
