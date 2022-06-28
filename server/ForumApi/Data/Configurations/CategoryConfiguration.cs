using ForumApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumApi.Data.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> category)
        {
            category
                .Property(c => c.Name)
                .HasMaxLength(18)
                .IsRequired();

            category
                .HasIndex(c => c.IsDeleted);
        }
    }
}
