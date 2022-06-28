using ForumApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumApi.Data.Configurations
{
    public class ReplyConfiguration : IEntityTypeConfiguration<Reply>
    {
        public void Configure(EntityTypeBuilder<Reply> reply)
        {
            reply
                .Property(r => r.Description)
                .HasMaxLength(250)
                .IsRequired();

            reply
                .HasOne(r => r.Post)
                .WithMany(p => p.Replies)
                .HasForeignKey(r => r.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            reply
                .HasOne(r => r.Author)
                .WithMany(a => a.Replies)
                .HasForeignKey(r => r.AuthorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            reply
                .HasOne(r => r.Parent)
                .WithMany()
                .HasForeignKey(r => r.ParentId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            reply
                .HasIndex(r => r.IsDeleted);
        }
    }
}
