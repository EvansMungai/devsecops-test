using UHB.Application.Dtos.Student;
using UHB.Extensions.RouteHandlers;
using UHB.Features.StudentManagement.Services;

namespace UHB.Features.StudentManagement.Endpoints;

public class StudentHandler : IHandler
{
    public static string RouteName => "Student Management";
    private readonly IStudentService _studentService;
    public StudentHandler(IStudentService studentService)
    {
        _studentService = studentService;
    }

    public Task<IResult> GetStudents() => _studentService.GetStudents();
    public Task<IResult> GetStudentById(string regNo) => _studentService.GetStudent(regNo);
    public Task<IResult> CreateStudent(StudentCreateDto student) => _studentService.CreateStudent(student);
    public Task<IResult> UpdateStudentDetails(StudentCreateDto update, string regNo) => _studentService.UpdateStudent(update, regNo);
    public Task<IResult> RemoveStudent(string regNo) => _studentService.RemoveStudent(regNo);
}
