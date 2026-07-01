using UHB.Application.Dtos.Student;
using UHB.Extensions.RouteHandlers;

namespace UHB.Features.StudentManagement.Endpoints;

public class StudentRoutes : IRouteRegistrar
{
    public void RegisterRoutes(WebApplication application)
    {
        MapStudentRoutes(application);
    }
    private void MapStudentRoutes(WebApplication webApplication)
    {
        var app = webApplication.MapGroup("").WithTags("Student");
        app.MapGet("/students", (StudentHandler handler) => handler.GetStudents()).WithTags("Students").Produces(200).Produces(404).Produces<List<StudentDto>>().RequireAuthorization("CanAccessManagement");
        app.MapGet("/student/{id}", (StudentHandler handler, string id) => handler.GetStudentById(id)).WithTags("Students").Produces(200).Produces(404).Produces<StudentDto>().RequireAuthorization("CanAccessEverything");
        app.MapPost("/student", (StudentHandler handler, StudentCreateDto student) => handler.CreateStudent(student)).WithTags("Students").Produces(200).Produces(404).Produces<StudentDto>().RequireAuthorization("CanAccessStudentDetails");
        app.MapPut("/student/{id}", (StudentHandler handler, StudentCreateDto student, string id) => handler.UpdateStudentDetails(student, id)).WithTags("Students").Produces(200).Produces(404).RequireAuthorization("CanAccessStudentDetails");
        app.MapDelete("/student/{id}", (StudentHandler handler, string id) => handler.RemoveStudent(id)).WithTags("Students").Produces(200).Produces(404).RequireAuthorization("CanAccessManagement");
    }
}
