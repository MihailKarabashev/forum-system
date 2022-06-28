using ForumApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumApi.Data.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> post)
        {
            post.HasKey(x => x.Id);

            post
                .Property(p => p.Title)
                .HasMaxLength(40)
                .IsRequired();

            post
                .Property(p => p.Description)
                .HasMaxLength(250)
                .IsRequired();

            post
                .HasOne(p => p.Author)
                .WithMany(a => a.Posts)
                .HasForeignKey(p => p.AuthorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            post
                .HasOne(p => p.Category)
                .WithMany(c => c.Posts)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            post
                .HasIndex(p => p.IsDeleted);
        }
    }
}
