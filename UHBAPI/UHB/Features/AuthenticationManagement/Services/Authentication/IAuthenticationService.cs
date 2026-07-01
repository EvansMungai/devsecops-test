using UHB.Application.Dtos.Authentication.User;

namespace UHB.Features.AuthenticationManagement.Services;

public interface IAuthenticationService
{
    Task<IResult> Register(RegisterRequest request, string platform);
    Task<IResult> Login(LoginRequest model, string platform);
    Task<IResult> LogOut();
}
