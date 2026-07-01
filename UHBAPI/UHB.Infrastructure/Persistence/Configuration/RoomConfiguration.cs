using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UHB.Domain.Entities;

namespace UHB.Infrastructure.Persistence.Configuration;

public class RoomConfiguration : IEntityTypeConfiguration<RoomDomain>
{
    public void Configure(EntityTypeBuilder<RoomDomain> builder)
    {
        builder.HasKey(e => e.RoomNo).HasName("PRIMARY");

        builder.ToTable("rooms");

        builder.HasIndex(e => e.HostelNo, "HostelNo");

        builder.Property(e => e.RoomNo).HasMaxLength(30);
        builder.Property(e => e.HostelNo).HasMaxLength(30);

        builder.HasOne(d => d.HostelNoNavigation).WithMany(p => p.Rooms)
            .HasForeignKey(d => d.HostelNo)
            .HasConstraintName("rooms_ibfk_1");
    }
}
