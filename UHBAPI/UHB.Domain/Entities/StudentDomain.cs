using UHB.Domain.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace UHB.Domain.Entities;

public class StudentDomain : IBaseEntity
{
    public string RegNo { get; set; } = null!;
    public string? Surname { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? Gender { get; set; }
    public virtual ICollection<ApplicationDomain> Applications { get; set; } = new List<ApplicationDomain>();
    public virtual ICollection<UserDomain> Users { get; set; } = new List<UserDomain>();
}
