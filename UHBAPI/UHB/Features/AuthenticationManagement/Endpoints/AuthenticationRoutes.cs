using UHB.Application.Dtos.Authentication.User;
using UHB.Extensions.RouteHandlers;

namespace UHB.Features.AuthenticationManagement.Endpoints;

public class AuthenticationRoutes : IRouteRegistrar
{
    public void RegisterRoutes(WebApplication app)
    {
        MapAuthenticationRoutes(app);
    }
    public void MapAuthenticationRoutes(WebApplication application)
    {
        application.MapGet("/", () => "Welcome to UHB API V2");

        var app = application.MapGroup("").WithTags("Authentication");
        app.MapPost("/register", (RegisterRequest model, AuthenticationHandler handler, string platform) => handler.RegisterUser(model, platform));
        app.MapPost("/login", (LoginRequest model, AuthenticationHandler handler, string platform) => handler.Login(model, platform));
        app.MapPost("/logout", (AuthenticationHandler handler) => handler.LogOut());
    }
}
