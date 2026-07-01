using UHB.Application.Dtos.Room;
using UHB.Extensions.RouteHandlers;

namespace UHB.Features.HostelManagement.Endpoints;

public class RoomRoutes : IRouteRegistrar
{
    public void RegisterRoutes(WebApplication application)
    {
        MapRoomRoutes(application);
    }
    public void MapRoomRoutes(WebApplication application)
    {
        var app = application.MapGroup("").WithTags("Rooms");
        app.MapGet("/rooms", (RoomHandler handler) => handler.GetRooms()).WithTags("Rooms").Produces(200).Produces(404).Produces<List<RoomDto>>().RequireAuthorization("CanAccessEverything");
        app.MapGet("/room/{id}", (RoomHandler handler, string id) => handler.GetRoomById(id)).WithTags("Rooms").Produces(200).Produces(404).Produces<RoomDto>().RequireAuthorization("CanAccessEverything");
        app.MapPost("/room", (RoomHandler handler, RoomCreateDto room) => handler.CreateRoom(room)).WithTags("Rooms").Produces(200).Produces(404).Produces<RoomDto>().RequireAuthorization("CanAccessApplications");
        app.MapPut("/room/{id}", (RoomHandler handler, RoomCreateDto room, string id) => handler.UpdateRoomDetails(room, id)).WithTags("Rooms").Produces(200).Produces(404).RequireAuthorization("CanAccessApplications");
        app.MapDelete("/room/{id}", (RoomHandler handler, string id) => handler.RemoveRoom(id)).WithTags("Rooms").Produces(200).Produces(404).RequireAuthorization("CanAccessApplications");
    }
}
