using UHB.Application.Dtos.Student;
using UHB.Application.Interface;
using UHB.Domain.Entities;

namespace UHB.Features.StudentManagement.Services;

public class StudentService : IStudentService
{
    private readonly IRepository<StudentDomain, string> _repo;

    public StudentService(IRepository<StudentDomain, string> repo)
    {
        _repo = repo;
    }

    public async Task<IResult> GetStudents()
    {
        List<StudentDto> students = await _repo.GetAllAsync<StudentDto>();
        return students is null || students.Count == 0 ? Results.NotFound("No Categories found") : Results.Ok(students);
    }
    public async Task<IResult> GetStudent(string regNo)
    {
        regNo = getRegNo(regNo);
        StudentDto? student = await _repo.GetSingleAsync<StudentDto>(s => s.RegNo == regNo);
        return student is null ? Results.NotFound($"NO student with registration number = {regNo} was found") : Results.Ok(student);
    }
    public async Task<IResult> CreateStudent(StudentCreateDto student)
    {
        StudentDto? createdStudent = await _repo.CreateAsync<StudentDto, StudentCreateDto>(student);
        return Results.Ok(student);
    }
    public async Task<IResult> UpdateStudent(StudentCreateDto update, string regNo)
    {
        regNo = getRegNo(regNo);
        await _repo.UpdateAsync(update, s => s.RegNo == regNo);
        return Results.Ok($"Student details for registration number = {regNo} have been updated.");
    }

    public async Task<IResult> RemoveStudent(string regNo)
    {
        regNo = getRegNo(regNo);
        await _repo.RemoveAsync(s => s.RegNo == regNo);

        return Results.Ok($"Student with registration number = {regNo} has been removed.");
    }
    #region Utilities
    private static string getRegNo(string regNo)
    {
        regNo = regNo.Replace("%2F", "/");
        return regNo;
    }
    #endregion
}

