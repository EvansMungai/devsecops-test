using UHB.Application.Dtos.Application;
using UHB.Extensions.RouteHandlers;

namespace UHB.Features.ApplicationManagement.Endpoints;

public class ApplicationRoutes : IRouteRegistrar
{
    public void RegisterRoutes(WebApplication application)
    {
        MapApplicationRoutes(application);
    }

    public void MapApplicationRoutes(WebApplication application)
    {
        var app = application.MapGroup("").WithTags("Application");
        app.MapGet("/applications", (ApplicationHandler handler) => handler.GetApplications()).WithTags("Applications").Produces(200).Produces(404).Produces<List<ApplicationDto>>().RequireAuthorization("CanAccessApplications");
        app.MapGet("/accepted-applications", (ApplicationHandler handler) => handler.GetAcceptedApplications()).WithTags("Applications").Produces(200).Produces(404).Produces<List<ApplicationDto>>().RequireAuthorization("CanAccessAcceptedApplications");
        app.MapGet("/assigned-applications", (ApplicationHandler handler) => handler.GetAssignedApplications()).WithTags("Applications").Produces(200).Produces(404).Produces<List<ApplicationDto>>().RequireAuthorization("CanAccessAcceptedApplications");
        app.MapGet("/rejected-applications", (ApplicationHandler handler) => handler.GetRejectedApplications()).WithTags("Applications").Produces(200).Produces(404).Produces<List<ApplicationDto>>().RequireAuthorization("CanAccessApplications");
        app.MapGet("/application/{id}", (ApplicationHandler handler, int id) => handler.GetApplicationById(id)).WithTags("Applications").Produces(200).Produces(404).Produces<ApplicationDto>().RequireAuthorization("CanAccessStudentDetails");
        app.MapPost("/application", (ApplicationHandler handler, ApplicationCreateDto application) => handler.CreateApplication(application)).WithTags("Applications").Produces(200).Produces(404).Produces<ApplicationDto>().RequireAuthorization("CanAccessStudentDetails");
        app.MapPut("/application/{id}", (ApplicationHandler handler, ApplicationCreateDto application, int id) => handler.UpdateApplicationDetails(application, id)).WithTags("Applications").Produces(200).Produces(404).RequireAuthorization("CanAccessStudentDetails");
        app.MapPut("/application/{id}/status", (ApplicationHandler handler, ApplicationUpdateStatusDto update, int id) => handler.UpdateApplicationStatus(update, id)).WithTags("Applications").Produces(200).Produces(404).RequireAuthorization("CanAccessApplications");
        app.MapPut("/application/{id}/room", (ApplicationHandler handler, ApplicationUpdateRoomDto update, int id) => handler.AssignRoomToApplicant(update, id)).WithTags("Applications").Produces(200).Produces(404).RequireAuthorization("CanAccessAcceptedApplications");
        app.MapDelete("/application/{id}", (ApplicationHandler handler, int id) => handler.RemoveApplication(id)).WithTags("Applications").Produces(200).Produces(404).RequireAuthorization("CanAccessStudentDetails");
    }
}
