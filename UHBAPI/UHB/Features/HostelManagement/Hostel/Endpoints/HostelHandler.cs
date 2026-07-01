using UHB.Application.Dtos.Hostel;
using UHB.Extensions.RouteHandlers;
using UHB.Features.HostelManagement.Services;

namespace UHB.Features.HostelManagement.Endpoints;

public class HostelHandler : IHandler
{
    public static string RouteName => "Hostel Management";
    private readonly IHostelService _hostelService;
    public HostelHandler(IHostelService hostelService)
    {
        _hostelService = hostelService;
    }
    public Task<IResult> GetHostels() => _hostelService.GetHostels();
    public Task<IResult> GetHostelById(string id) => _hostelService.GetHostel(id);
    public Task<IResult> CreateHostel(HostelCreateDto hostel) => _hostelService.CreateHostel(hostel);
    public Task<IResult> UpdateHostel(HostelCreateDto update, string id) => _hostelService.UpdateHostel(update, id);
    public Task<IResult> RemoveHostel(string id) => _hostelService.RemoveHostel(id);
}
