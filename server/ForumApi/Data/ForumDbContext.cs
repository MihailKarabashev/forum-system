using ForumApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Data
{
    public class ForumDbContext : IdentityDbContext<ForumUser, ForumRole, string>
    {
        public ForumDbContext(DbContextOptions<ForumDbContext> options)
          : base(options)
        {

        }
        public DbSet<Category> Categories { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Reply> Replies { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<ForumUser> ForumUser { get; set; }

        public DbSet<PostReaction> PostReactions { get; set; }

        public DbSet<ReplyReaction> ReplyReactions { get; set; }

        public DbSet<PostTag> PostsTags { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }

    }
}
