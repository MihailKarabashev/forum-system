using ForumApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumApi.Data.Configurations
{
    public class TagConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder
               .Property(t => t.Name)
               .HasMaxLength(17)
               .IsRequired();

            builder
                .HasIndex(t => t.IsDeleted);
        }
    }
}
