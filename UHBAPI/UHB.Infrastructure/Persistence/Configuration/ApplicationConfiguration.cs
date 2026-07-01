using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UHB.Domain.Entities;

namespace UHB.Infrastructure.Persistence.Configuration;

public class ApplicationConfiguration : IEntityTypeConfiguration<ApplicationDomain>
{
    public void Configure(EntityTypeBuilder<ApplicationDomain> builder)
    {
        builder.HasKey(e => e.ApplicationNo).HasName("PRIMARY");

        builder.ToTable("applications");

        builder.HasIndex(e => e.RegistrationNo, "RegistrationNo");

        builder.HasIndex(e => e.RoomNo, "RoomNo");

        builder.Property(e => e.AccommodatedBefore).HasMaxLength(4);
        builder.Property(e => e.AccommodationPeriod).HasMaxLength(30);
        builder.Property(e => e.ApplicationPeriod).HasMaxLength(30);
        builder.Property(e => e.BursaryAmount).HasMaxLength(15);
        builder.Property(e => e.Disability).HasMaxLength(30);
        builder.Property(e => e.DisabilityDetails).HasMaxLength(30);
        builder.Property(e => e.HelbAmount).HasMaxLength(15);
        builder.Property(e => e.IsSponsored).HasMaxLength(4);
        builder.Property(e => e.PreferredHostel).HasMaxLength(30);
        builder.Property(e => e.ReasonsForConsideration).HasMaxLength(50);
        builder.Property(e => e.ReceivedBursary).HasMaxLength(4);
        builder.Property(e => e.ReceivesHelb).HasMaxLength(4);
        builder.Property(e => e.RegistrationNo).HasMaxLength(30);
        builder.Property(e => e.RoomNo).HasMaxLength(30);
        builder.Property(e => e.SpecialExamPeriod).HasMaxLength(10);
        builder.Property(e => e.SpecialExamsOnFinancialGrounds).HasMaxLength(4);
        builder.Property(e => e.Sponsor).HasMaxLength(30);
        builder.Property(e => e.Status)
            .HasMaxLength(30)
            .HasDefaultValueSql("'Pending'");
        builder.Property(e => e.WorkStudyBenefitsBefore).HasMaxLength(4);
        builder.Property(e => e.WorkStudyPeriod).HasMaxLength(10);

        builder.HasOne(d => d.RegistrationNoNavigation).WithMany(p => p.Applications)
            .HasForeignKey(d => d.RegistrationNo)
            .HasConstraintName("applications_ibfk_1");

        builder.HasOne(d => d.RoomNoNavigation).WithMany(p => p.Applications)
            .HasForeignKey(d => d.RoomNo)
            .HasConstraintName("applications_ibfk_2");
    }
}
