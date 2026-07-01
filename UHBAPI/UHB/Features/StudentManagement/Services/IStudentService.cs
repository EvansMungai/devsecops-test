using UHB.Application.Dtos.Student;

namespace UHB.Features.StudentManagement.Services;

public interface IStudentService
{
    Task<IResult> GetStudents();
    Task<IResult> GetStudent(string regNo);
    Task<IResult> CreateStudent(StudentCreateDto student);
    Task<IResult> UpdateStudent(StudentCreateDto update, string regNo);
    Task<IResult> RemoveStudent(string regNo);
}
