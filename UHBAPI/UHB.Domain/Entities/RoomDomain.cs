using UHB.Domain.Interfaces;

namespace UHB.Domain.Entities;

public class RoomDomain : IBaseEntity
{
    public string RoomNo { get; set; } = null!;
    public string? HostelNo { get; set; }
    public virtual ICollection<ApplicationDomain> Applications { get; set; } = new List<ApplicationDomain>();
    public virtual HostelDomain? HostelNoNavigation { get; set; }
}
