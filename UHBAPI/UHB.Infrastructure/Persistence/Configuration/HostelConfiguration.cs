using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UHB.Domain.Entities;

namespace UHB.Infrastructure.Persistence.Configuration;

public class HostelConfiguration : IEntityTypeConfiguration<HostelDomain>
{
    public void Configure(EntityTypeBuilder<HostelDomain> builder)
    {
        builder.HasKey(e => e.HostelNo).HasName("PRIMARY");

        builder.ToTable("hostels");

        builder.Property(e => e.HostelNo).HasMaxLength(30);
        builder.Property(e => e.Capacity).HasMaxLength(10);
        builder.Property(e => e.HostelName).HasMaxLength(30);
        builder.Property(e => e.Type).HasMaxLength(15);
    }
}
