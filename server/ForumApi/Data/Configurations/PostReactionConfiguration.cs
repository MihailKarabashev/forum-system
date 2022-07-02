using ForumApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumApi.Data.Configurations
{
    public class PostReactionConfiguration : IEntityTypeConfiguration<PostReaction>
    {
        public void Configure(EntityTypeBuilder<PostReaction> builder)
        {
            builder
                .HasOne(pr => pr.Post)
                .WithMany(p => p.PostReactions)
                .HasForeignKey(pr => pr.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
               .HasOne(pr => pr.Author)
               .WithMany(p => p.PostReactions)
               .HasForeignKey(pr => pr.AuthorId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
