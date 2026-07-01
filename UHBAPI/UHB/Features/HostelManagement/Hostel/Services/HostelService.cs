using UHB.Application.Dtos.Hostel;
using UHB.Application.Interface;
using UHB.Domain.Entities;

namespace UHB.Features.HostelManagement.Services;

public class HostelService : IHostelService
{
    private readonly IRepository<HostelDomain, string> _repo;

    public HostelService(IRepository<HostelDomain, string> repo)
    {
        _repo = repo;
    }

    public async Task<IResult> GetHostels()
    {
        List<HostelDto> hostels = await _repo.GetAllAsync<HostelDto>();
        return hostels is null || hostels.Count == 0 ? Results.NotFound("No hostels found") : Results.Ok(hostels);
    }
    public async Task<IResult> GetHostel(string id)
    {
        HostelDto? hostel = await _repo.GetSingleAsync<HostelDto>(h => h.HostelNo == id);
        return hostel is null ? Results.NotFound($"Hostel with id = {id} was not found") : Results.Ok(hostel);
    }
    public async Task<IResult> CreateHostel(HostelCreateDto hostel)
    {
        HostelDto? createdHostel = await _repo.CreateAsync<HostelDto, HostelCreateDto>(hostel);
        return Results.Ok(createdHostel);
    }
    public async Task<IResult> UpdateHostel(HostelCreateDto update, string id)
    {

        await _repo.UpdateAsync(update, h => h.HostelNo == id);
        return Results.Ok($"Hostel details for hostel number {id} has been updated");
    }
    public async Task<IResult> RemoveHostel(string id)
    {
        await _repo.RemoveAsync(h => h.HostelNo == id);
        return Results.Ok($"Hostel number {id} has been deleted.");
    }
}
