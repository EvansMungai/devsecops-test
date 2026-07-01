using UHB.Application.Dtos.Hostel;
using UHB.Extensions.RouteHandlers;

namespace UHB.Features.HostelManagement.Endpoints;

public class HostelRoutes : IRouteRegistrar
{
    public void RegisterRoutes(WebApplication application)
    {
        MapHostelRoutes(application);
    }

    public void MapHostelRoutes(WebApplication application)
    {
        var app = application.MapGroup("").WithTags("Hostels");
        app.MapGet("/hostels", (HostelHandler handler) => handler.GetHostels()).WithTags("Hostels").Produces(200).Produces(404).Produces<List<HostelDto>>().RequireAuthorization("CanAccessEverything");
        app.MapGet("/hostel/{id}", (HostelHandler handler, string id) => handler.GetHostelById(id)).WithTags("Hostels").Produces(200).Produces(404).Produces<HostelDto>().RequireAuthorization("CanAccessEverything");
        app.MapPost("/hostel", (HostelHandler handler, HostelCreateDto hostel) => handler.CreateHostel(hostel)).WithTags("Hostels").Produces(200).Produces(404).Produces<HostelDto>().RequireAuthorization("CanAccessApplications");
        app.MapPut("/hostel/{id}", (HostelHandler handler, HostelCreateDto hostel, string id) => handler.UpdateHostel(hostel, id)).WithTags("Hostels").Produces(200).Produces(404).RequireAuthorization("CanAccessApplications");
        app.MapDelete("/hostel/{id}", (HostelHandler handler, string id) => handler.RemoveHostel(id)).WithTags("Hostels").Produces(200).Produces(404).RequireAuthorization("CanAccessApplications");
    }
}
