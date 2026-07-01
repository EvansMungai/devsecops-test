using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UHB.Application.Dtos.Authentication.User;
using UHB.Domain.Entities;
using UHB.Features.AuthenticationManagement.Services.Authentication.Token;
using UHB.Infrastructure.Persistence;

namespace UHB.Features.AuthenticationManagement.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<UserDomain> _userManager;
    private readonly SignInManager<UserDomain> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ILogger<AuthenticationService> _logger;
    private readonly IUserManagementService _userManagementService;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly UhbContext _context;
    public AuthenticationService(UserManager<UserDomain> userManager, SignInManager<UserDomain> signInManager, RoleManager<IdentityRole> roleManager, ILogger<AuthenticationService> logger, IUserManagementService userManagementService, ITokenService tokenService, IMapper mapper, UhbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _logger = logger;
        _userManagementService = userManagementService;
        _tokenService = tokenService;
        _mapper = mapper;
        _context = context;
    }
    public async Task<IResult> Register(RegisterRequest request, string platform)
    {
        UserDomain user = _mapper.Map<UserDomain>(request);
        user.LastLoginTime = DateTime.UtcNow;

        IdentityResult result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            _logger.LogError("An error occurred in trying to create the user: {@result}", result.Errors);
            throw new ArgumentException("An error occurred in trying to create the user.");
        }

        await _userManager.AddToRoleAsync(user, "Student");
        IList<string> roles = new List<string> { "Student" };

        string token = _tokenService.GenerateJwtToken(user, platform, roles);

        return Results.Ok(new
        {
            token,
            user = new
            {
                user.UserName,
                user.RegNo,
                roles
            }
        });

    }

    public async Task<IResult> Login(LoginRequest model, string platform)
    {
        UserDomain? user = await _userManager.FindByNameAsync(model.UserName);
        if (user is null)
        {
            _logger.LogError("Login attempt for non-existent user {@username}", model.UserName);
            throw new ArgumentException("Incorrect Username or password");
        }

        SignInResult result = await _signInManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: true);
        if (result.IsLockedOut)
        {
            _logger.LogWarning("User account {@username} is locked out.", model.UserName);
            throw new ArgumentException("Account is locked. Please try again later");
        }
        if (!result.Succeeded)
        {
            _logger.LogError("Invalid login attempt for user {@username}", model.UserName);
            throw new ArgumentException("Incorrect username or password");
        }

        await _context.Users.Where(u => u.Id == user.Id).ExecuteUpdateAsync(u => u.SetProperty(p => p.LastLoginTime, DateTime.UtcNow));

        IList<string> userRoles = await _userManager.GetRolesAsync(user);
        string token = _tokenService.GenerateJwtToken(user, platform, userRoles);

        return Results.Ok(new
        {
            token,
            user = new
            {
                user.UserName,
                user.RegNo,
                roles = userRoles
            }
        });
    }
    public async Task<IResult> LogOut()
    {
        await _signInManager.SignOutAsync();
        return Results.Ok("Successfully logged out");
    }
}
