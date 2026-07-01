namespace UHB.Extensions;

public static class CorsServiceRegistration
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:4200", "https://uhb.vercel.app").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
        });
    }
}
