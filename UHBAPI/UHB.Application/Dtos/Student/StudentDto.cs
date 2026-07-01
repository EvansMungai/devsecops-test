using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Student;

public class StudentDto : IMapFrom<StudentDomain>
{
    public string RegNo { get; set; } = null!;
    public string? Surname { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? Gender { get; set; }
}
