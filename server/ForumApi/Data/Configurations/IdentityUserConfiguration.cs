using ForumApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumApi.Data.Configurations
{
    public class IdentityUserConfiguration : IEntityTypeConfiguration<ForumUser>
    {
        public void Configure(EntityTypeBuilder<ForumUser> user)
        {
            user
                .Property(u => u.ProfilePicture)
                .IsRequired();


            user
                .HasMany(e => e.Roles)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            user
                .HasIndex(u => u.IsDeleted);
        }
    }
}
