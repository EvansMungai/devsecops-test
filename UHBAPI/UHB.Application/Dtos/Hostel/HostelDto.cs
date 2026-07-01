using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Hostel;

public class HostelDto : IMapFrom<HostelDomain>
{
    public string HostelNo { get; set; } = null!;
    public string? HostelName { get; set; }
    public string? Capacity { get; set; }
    public string? Type { get; set; }
}
