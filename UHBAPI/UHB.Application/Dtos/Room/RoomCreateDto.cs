using System.ComponentModel.DataAnnotations;
using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Room;

public class RoomCreateDto : IMapFrom<RoomDomain>
{
    [Required]
    public required string RoomNo { get; set; }

    [Required]
    public required string? HostelNo { get; set; }
}
