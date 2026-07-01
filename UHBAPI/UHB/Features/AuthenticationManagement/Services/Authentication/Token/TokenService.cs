using UHB.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;

namespace UHB.Features.AuthenticationManagement.Services.Authentication.Token;

public class TokenService : ITokenService
{
    private readonly JwtOptions _jwtOptions;
    private readonly SymmetricSecurityKey _key;
    private readonly SigningCredentials _creds;
    public TokenService(IOptions<JwtOptions> options)
    {
        _jwtOptions = options.Value;

        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey));
        _creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
    }

    public string GenerateJwtToken(UserDomain user, string platform, IList<string> roles)
    {
        string? audience = platform.Trim().ToLower() switch
        {
            "web" => _jwtOptions.Audiences.Web,
            "mobile" => _jwtOptions.Audiences.Mobile,
            _ => throw new ArgumentException("Invalid platform")
        };

        List<Claim> claims = new List<Claim>
        {
             new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
             new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer),
             new Claim(JwtRegisteredClaimNames.Aud, audience),
             new Claim(ClaimTypes.Name, user.UserName),
             new Claim(ClaimTypes.NameIdentifier, user.Id),
             new Claim("platform", platform.ToLower())
        };

        foreach (string role in roles)
            claims.Add(new Claim(ClaimTypes.Role, role));

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: _creds
            );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class JwtOptions
{
    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public Audiences Audiences { get; set; } = new();
}

public class Audiences
{
    public string Web { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;
}