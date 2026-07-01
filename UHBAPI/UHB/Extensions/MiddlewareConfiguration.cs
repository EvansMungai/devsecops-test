using UHB.Extensions.RouteHandlers;

namespace UHB.Extensions;

public static class MiddlewareConfiguration
{
    public static void ConfigureMiddleware(this WebApplication app)
    {
        app.Use(async (context, next) =>
        {
            context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
            await next();
        });
        app.UseCors();
        app.UseAuthentication();
        app.UseAuthorization();
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "UHB API V1");
            });
        }
        using var scope = app.Services.CreateScope();
        var routeBuilder = scope.ServiceProvider.GetService<RouteHelper>();
        routeBuilder?.RegisterRoutes(app);
    }
}
