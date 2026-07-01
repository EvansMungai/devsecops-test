using UHB.Application.Dtos.Room;
using UHB.Application.Interface;
using UHB.Domain.Entities;

namespace UHB.Features.HostelManagement.Services;

public class RoomService : IRoomService
{
    private readonly IRepository<RoomDomain, string> _repo;

    public RoomService(IRepository<RoomDomain, string> repo)
    {
        _repo = repo;
    }

    public async Task<IResult> GetRooms()
    {
        List<RoomDto> rooms = await _repo.GetAllAsync<RoomDto>();
        return rooms is null || rooms.Count == 0 ? Results.NotFound("No rooms were found") : Results.Ok(rooms);
    }
    public async Task<IResult> GetRoom(string id)
    {
        RoomDto? room = await _repo.GetSingleAsync<RoomDto>(r => r.RoomNo == id);
        return room is null ? Results.NotFound($"Room with id ={id} was not found") : Results.Ok(room);
    }
    public async Task<IResult> CreateRoom(RoomCreateDto room)
    {
        RoomDto? createdRoom = await _repo.CreateAsync<RoomDto, RoomCreateDto>(room);
        return Results.Ok(room);
    }
    public async Task<IResult> UpdateRoom(RoomCreateDto update, string id)
    {
        await _repo.UpdateAsync(update, r => r.RoomNo == id);
        return Results.Ok($"Room details have been updated.");
    }
    public async Task<IResult> RemoveRoom(string id)
    {
        await _repo.RemoveAsync(r => r.RoomNo == id);
        return Results.Ok($"Room with room number {id} has been removed.");
    }
}
