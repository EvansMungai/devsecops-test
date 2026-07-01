using UHB.Application.Dtos.Room;
using UHB.Extensions.RouteHandlers;
using UHB.Features.HostelManagement.Services;

namespace UHB.Features.HostelManagement.Endpoints;

public class RoomHandler : IHandler
{
    public static string RouteName => "Rooms Management";
    private readonly IRoomService _roomService;
    public RoomHandler(IRoomService roomService)
    {
        _roomService = roomService;
    }

    public Task<IResult> GetRooms() => _roomService.GetRooms();
    public Task<IResult> GetRoomById(string id) => _roomService.GetRoom(id);
    public Task<IResult> CreateRoom(RoomCreateDto room) => _roomService.CreateRoom(room);
    public Task<IResult> UpdateRoomDetails(RoomCreateDto update, string id) => _roomService.UpdateRoom(update, id);
    public Task<IResult> RemoveRoom(string id) => _roomService.RemoveRoom(id);
}
