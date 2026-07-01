using System.ComponentModel.DataAnnotations;
using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Application;

public class ApplicationUpdateRoomDto : IMapFrom<ApplicationDomain>
{
    [Required]
    public required string RoomNo { get; set; }
}
