using Microsoft.AspNetCore.Identity;
using UHB.Application.Dtos.Authentication;
using UHB.Application.Dtos.Authentication.User;
using UHB.Extensions.RouteHandlers;
using UHB.Features.AuthenticationManagement.Services;

namespace UHB.Features.AuthenticationManagement.Endpoints;

public class UserManagementHandler : IHandler
{
    public static string RouteName => "User Management";
    private readonly IUserManagementService _userManagementService;

    public UserManagementHandler(IUserManagementService userManagementService)
    {
        _userManagementService = userManagementService;
    }

    #region User Handlers
    public Task<IResult> RegisterSpecialUsers(SpecialRegisterRequest user) => _userManagementService.RegisterSpecialUsers(user);
    public Task<IResult> GetUsers() => _userManagementService.GetUsers();
    public Task<IResult> GetSpecialUsers() => _userManagementService.GetSpecialUsers();
    //public Task<IResult> UpdateUserDetails(string user,  update) => _userManagementService.UpdateUserDetails(user, update);
    public Task<IResult> GetUser(string regNo) => _userManagementService.GetUser(regNo);
    public Task<IResult> RemoveUser(string regNo) => _userManagementService.RemoveUser(regNo);
    public Task<IResult> ChangeUserPassword(ChangePasswordRequest model, HttpContext context) => _userManagementService.ChangeUserPassword(model, context);
    #endregion

    #region Role Handlers
    public Task<List<string>> GetRoles() => _userManagementService.GetRoles();
    public Task<IResult> AssignRoleToUserAsync(string userId, string roleName) => _userManagementService.AssignRoleToUserAsync(userId, roleName);
    public Task<bool> EnsureRoleExists(string role) => _userManagementService.EnsureRoleExists(role);
    public Task<IdentityResult> CreateRole(string role) => _userManagementService.CreateRole(role);
    public Task<IResult> EditRole(string role, string newRoleName) => _userManagementService.EditRole(role, newRoleName);
    public Task<IdentityResult> RemoveRole(string roleName) => _userManagementService.RemoveRole(roleName);
    #endregion
}
