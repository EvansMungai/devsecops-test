using UHB.Application.Dtos.Application;
using UHB.Application.Interface;
using UHB.Domain.Entities;

namespace UHB.Features.ApplicationManagement.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly IRepository<ApplicationDomain, int> _repo;

        public ApplicationService(IRepository<ApplicationDomain, int> repo)
        {
            _repo = repo;
        }

        public async Task<IResult> GetApplications()
        {
            List<ApplicationDto> applications = await _repo.GetAllAsync<ApplicationDto>();
            return applications == null || applications.Count == 0 ? Results.NotFound("No applications were found") : Results.Ok(applications);
        }

        public async Task<IResult> GetApplication(int id)
        {
            ApplicationDto? application = await _repo.GetSingleAsync<ApplicationDto>(a => a.ApplicationNo == id);
            return application == null ? Results.NotFound($"Application with application id ={id} was not found") : Results.Ok(application);
        }
        public async Task<IResult> GetAcceptedApplications()
        {
            List<ApplicationDto> applications = await _repo.GetFilteredAsync<ApplicationDto>(a => a.Status == "Accepted");
            return applications == null || !applications.Any() ? Results.NotFound("No Accepted applications were found.") : Results.Ok(applications);
        }
        public async Task<IResult> GetAssignedApplications()
        {
            List<ApplicationDto> applications = await _repo.GetFilteredAsync<ApplicationDto>(a => a.RoomNo != null);
            return applications == null || !applications.Any() ? Results.NotFound("No assigned applications were found.") : Results.Ok(applications);
        }
        public async Task<IResult> GetRejectedApplications()
        {
            List<ApplicationDto> applications = await _repo.GetFilteredAsync<ApplicationDto>(a => a.Status == "Rejected");
            return applications == null || !applications.Any() ? Results.NotFound("No Accepted applications were found.") : Results.Ok(applications);
        }
        public async Task<IResult> CreateApplication(ApplicationCreateDto application)
        {
            ApplicationDto createdApplication = await _repo.CreateAsync<ApplicationDto, ApplicationCreateDto>(application);
            return Results.Ok(createdApplication);
        }
        public async Task<IResult> UpdateApplicationDetails(ApplicationCreateDto update, int id)
        {
            await _repo.UpdateAsync(update, a => a.ApplicationNo == id);
            return Results.Ok($"Application details for application {id} has been updated.");
        }
        public async Task<IResult> UpdateApplicationStatus(ApplicationUpdateStatusDto update, int id)
        {
            await _repo.UpdateAsync(update, a => a.ApplicationNo == id);
            return Results.Ok($"Application status for application {id} has been updated.");
        }
        public async Task<IResult> UpdateRoomNo(ApplicationUpdateRoomDto update, int id)
        {
            await _repo.UpdateAsync(update, a => a.ApplicationNo == id);
            return Results.Ok($"Application with application number {id} has been assigned a room.");
        }
        public async Task<IResult> RemoveApplication(int id)
        {
            await _repo.RemoveAsync(a => a.ApplicationNo == id);
            return Results.Ok("Application with application number {id} has been deleted");

        }
    }
}
