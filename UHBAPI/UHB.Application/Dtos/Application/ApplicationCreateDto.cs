using UHB.Domain.Entities;
using UHB.Domain.Interfaces;

namespace UHB.Application.Dtos.Application;

public class ApplicationCreateDto : IMapFrom<ApplicationDomain>
{
    public string? ApplicationPeriod { get; set; }
    public string? RegistrationNo { get; set; }
    public string? PreferredHostel { get; set; }
    public string? Disability { get; set; }
    public string? DisabilityDetails { get; set; }
    public string? AccommodatedBefore { get; set; }
    public string? AccommodationPeriod { get; set; }
    public string? IsSponsored { get; set; }
    public string? Sponsor { get; set; }
    public string? ReceivesHelb { get; set; }
    public string? HelbAmount { get; set; }
    public string? ReceivedBursary { get; set; }
    public string? BursaryAmount { get; set; }
    public string? WorkStudyBenefitsBefore { get; set; }
    public string? WorkStudyPeriod { get; set; }
    public string? SpecialExamsOnFinancialGrounds { get; set; }
    public string? SpecialExamPeriod { get; set; }
    public string? ReasonsForConsideration { get; set; }
}
