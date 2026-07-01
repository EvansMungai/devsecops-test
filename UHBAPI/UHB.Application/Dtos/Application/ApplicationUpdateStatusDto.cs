using System.ComponentModel.DataAnnotations;
using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Application;

public class ApplicationUpdateStatusDto : IMapFrom<ApplicationDomain>
{
    [Required]
    public required string Status { get; set; }

    [Required]
    public required string PreferredHostel { get; set; }
}
