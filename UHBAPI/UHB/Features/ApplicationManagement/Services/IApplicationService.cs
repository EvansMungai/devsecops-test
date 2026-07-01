using UHB.Application.Dtos.Application;

namespace UHB.Features.ApplicationManagement.Services
{
    public interface IApplicationService
    {
        Task<IResult> GetApplications();
        Task<IResult> GetApplication(int id);
        Task<IResult> GetAcceptedApplications();
        Task<IResult> GetAssignedApplications();
        Task<IResult> GetRejectedApplications();
        Task<IResult> CreateApplication(ApplicationCreateDto application);
        Task<IResult> UpdateApplicationDetails(ApplicationCreateDto update, int id);
        Task<IResult> UpdateApplicationStatus(ApplicationUpdateStatusDto update, int id);
        Task<IResult> UpdateRoomNo(ApplicationUpdateRoomDto update, int id);
        Task<IResult> RemoveApplication(int id);
    }
}
