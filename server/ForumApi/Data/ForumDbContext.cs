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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }

    }
}
