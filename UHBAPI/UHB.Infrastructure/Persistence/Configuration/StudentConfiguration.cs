using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UHB.Domain.Entities;

namespace UHB.Infrastructure.Persistence.Configuration;

public class StudentConfiguration : IEntityTypeConfiguration<StudentDomain>
{
    public void Configure(EntityTypeBuilder<StudentDomain> builder)
    {
        builder.HasKey(e => e.RegNo).HasName("PRIMARY");

        builder.ToTable("students");

        builder.Property(e => e.RegNo)
            .HasMaxLength(30)
            .HasColumnName("RegNO");
        builder.Property(e => e.FirstName).HasMaxLength(30);
        builder.Property(e => e.Gender).HasMaxLength(10);
        builder.Property(e => e.SecondName).HasMaxLength(30);
        builder.Property(e => e.Surname).HasMaxLength(30);
    }
}
