using Microsoft.AspNetCore.Identity;
using UHB.Domain.Interfaces;

namespace UHB.Domain.Entities;

public class UserDomain : IdentityUser, IBaseEntity
{
    public DateTime LastLoginTime { get; set; }
    public string? RegNo { get; set; }
    public virtual StudentDomain? RegNoNavigation { get; set; }
}
