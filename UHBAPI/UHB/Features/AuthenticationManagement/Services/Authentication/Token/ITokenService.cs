using UHB.Domain.Entities;

namespace UHB.Features.AuthenticationManagement.Services.Authentication.Token;

public interface ITokenService
{
    string GenerateJwtToken(UserDomain user, string platform, IList<string> roles);
}
