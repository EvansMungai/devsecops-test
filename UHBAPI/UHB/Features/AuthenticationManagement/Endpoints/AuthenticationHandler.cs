using UHB.Application.Dtos.Authentication.User;
using UHB.Extensions.RouteHandlers;
using UHB.Features.AuthenticationManagement.Services;

namespace UHB.Features.AuthenticationManagement.Endpoints;

public class AuthenticationHandler : IHandler
{
    public static string RouteName => "Authentication Management";
    private readonly IAuthenticationService _authenticationService;
    public AuthenticationHandler(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }
    public Task<IResult> RegisterUser(RegisterRequest model, string platform) => _authenticationService.Register(model, platform);
    public Task<IResult> Login(LoginRequest model, string platform) => _authenticationService.Login(model, platform);
    public Task<IResult> LogOut() => _authenticationService.LogOut();
}
