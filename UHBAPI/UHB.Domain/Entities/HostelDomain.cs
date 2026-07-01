using UHB.Domain.Interfaces;

namespace UHB.Domain.Entities;

public class HostelDomain : IBaseEntity
{
    public string HostelNo { get; set; } = null!;
    public string? HostelName { get; set; }
    public string? Capacity { get; set; }
    public string? Type { get; set; }
    public virtual ICollection<RoomDomain> Rooms { get; set; } = new List<RoomDomain>();
}
