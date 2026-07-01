using UHB.Application.Dtos.Application;
using UHB.Extensions.RouteHandlers;
using UHB.Features.ApplicationManagement.Services;

namespace UHB.Features.ApplicationManagement.Endpoints;

public class ApplicationHandler : IHandler
{
    public static string RouteName => "Application";
    private readonly IApplicationService _applicationService;
    public ApplicationHandler(IApplicationService applicationService)
    {
        _applicationService = applicationService;
    }

    public Task<IResult> GetApplications() => _applicationService.GetApplications();
    public Task<IResult> GetApplicationById(int id) => _applicationService.GetApplication(id);
    public Task<IResult> GetAcceptedApplications() => _applicationService.GetAcceptedApplications();
    public Task<IResult> GetAssignedApplications() => _applicationService.GetAssignedApplications();
    public Task<IResult> GetRejectedApplications() => _applicationService.GetRejectedApplications();
    public Task<IResult> CreateApplication(ApplicationCreateDto application) => _applicationService.CreateApplication(application);
    public Task<IResult> UpdateApplicationDetails(ApplicationCreateDto application, int id) => _applicationService.UpdateApplicationDetails(application, id);
    public Task<IResult> UpdateApplicationStatus(ApplicationUpdateStatusDto update, int id) => _applicationService.UpdateApplicationStatus(update, id);
    public Task<IResult> AssignRoomToApplicant(ApplicationUpdateRoomDto update, int id) => _applicationService.UpdateRoomNo(update, id);
    public Task<IResult> RemoveApplication(int id) => _applicationService.RemoveApplication(id);
}
