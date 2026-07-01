using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Hostel;

public class HostelCreateDto : IMapFrom<HostelDomain>
{
    public required string HostelNo { get; set; } = null!;
    public required string HostelName { get; set; }
    public required string Capacity { get; set; }
    public required string Type { get; set; }
}
