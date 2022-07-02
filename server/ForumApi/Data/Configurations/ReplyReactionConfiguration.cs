using ForumApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumApi.Data.Configurations
{
    public class ReplyReactionConfiguration : IEntityTypeConfiguration<ReplyReaction>
    {
        public void Configure(EntityTypeBuilder<ReplyReaction> builder)
        {
            builder
                 .HasOne(rr => rr.Reply)
                 .WithMany(r => r.ReplyReactions)
                 .HasForeignKey(rr => rr.ReplyId)
                 .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(rr => rr.Author)
                .WithMany(r => r.ReplyReactions)
                .HasForeignKey(rr => rr.AuthorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
