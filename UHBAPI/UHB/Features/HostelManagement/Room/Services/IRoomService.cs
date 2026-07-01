using UHB.Application.Dtos.Room;

namespace UHB.Features.HostelManagement.Services;

public interface IRoomService
{
    Task<IResult> GetRooms();
    Task<IResult> GetRoom(string id);
    Task<IResult> CreateRoom(RoomCreateDto room);
    Task<IResult> UpdateRoom(RoomCreateDto update, string id);
    Task<IResult> RemoveRoom(string id);
}

