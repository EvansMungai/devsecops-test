using System.Reflection;

namespace UHB.Extensions.RouteHandlers;

public static class HandlerRegistrarSetup
{
    public static void RegisterHandlers(this IServiceCollection services)
    {
        var handlerRegistrarType = typeof(IHandler);
        var registrars = Assembly.GetExecutingAssembly().GetTypes().Where(r => handlerRegistrarType.IsAssignableFrom(r) && r.IsClass && !r.IsAbstract);

        foreach (var registrar in registrars)
        {
            services.AddScoped(handlerRegistrarType, registrar);
            services.AddScoped(registrar);
        }
    }
}

