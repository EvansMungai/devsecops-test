using UHB.Application.Dtos.Hostel;

namespace UHB.Features.HostelManagement.Services;

public interface IHostelService
{
    Task<IResult> GetHostels();
    Task<IResult> GetHostel(string id);
    Task<IResult> CreateHostel(HostelCreateDto hostel);
    Task<IResult> UpdateHostel(HostelCreateDto update, string id);
    Task<IResult> RemoveHostel(string id);
}

