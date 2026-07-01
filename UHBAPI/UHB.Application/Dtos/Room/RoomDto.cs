using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Room;

public class RoomDto : IMapFrom<RoomDomain>
{
    public string RoomNo { get; set; } = null!;
    public string? HostelNo { get; set; }
}
