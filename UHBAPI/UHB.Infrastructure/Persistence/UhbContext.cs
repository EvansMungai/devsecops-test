using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UHB.Domain.Entities;

namespace UHB.Infrastructure.Persistence;

public class UhbContext : IdentityDbContext<UserDomain>
{
    public DbSet<UserDomain> Users => Set<UserDomain>();
    public UhbContext(DbContextOptions<UhbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityUserLogin<string>>().HasKey(iul => new { iul.LoginProvider, iul.ProviderKey });
        builder.Entity<IdentityUserRole<string>>().HasKey(iur => new { iur.UserId, iur.RoleId });
        builder.Entity<IdentityUserToken<string>>().HasKey(iut => new { iut.UserId, iut.LoginProvider, iut.Name });

        builder.ApplyConfigurationsFromAssembly(typeof(UhbContext).Assembly);

        builder.Entity<UserDomain>()
                    .Property(u => u.RegNo).HasColumnType("varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

        builder.Entity<UserDomain>()
                    .HasOne(u => u.RegNoNavigation)
                    .WithMany(s => s.Users)
                    .HasForeignKey(u => u.RegNo)
                    .HasPrincipalKey(s => s.RegNo);
    }
}
