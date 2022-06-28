using ForumApi.Data;
using ForumApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class PostService : IPostService
    {
        private readonly ForumDbContext db;

        public PostService(ForumDbContext db)
        {
            this.db = db;
        }

        public async Task<Post> CreateAsync(string title, string description, string authorId, int categoryId)
        {
            var post = new Post
            {
                Title = title,
                Description = description,
                AuthorId = authorId,
                CategoryId = categoryId,
                CreatedOn = DateTime.UtcNow
            };


            await this.db.Posts.AddAsync(post);
            await this.db.SaveChangesAsync();

            return post;
        }

        public async Task DeleteAsync(string id)
        {
            var post = await this.GetByIdAsync(id);

            post.IsDeleted = true;
            post.DeletedOn = DateTime.UtcNow;

            this.db.Update(post);
            await this.db.SaveChangesAsync();
        }

        public async Task EditAsync(string id, string title, string description, int categoryId)
        {
           var post = await this.GetByIdAsync(id);

            post.Title = title;
            post.Description = description;
            post.CategoryId = categoryId;
            post.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Post>> GetAllAsync()
        {
            return await this.db.Posts.AsNoTracking()
                                     .OrderByDescending(x => x.Replies.Count())
                                     .ThenBy(x => x.CreatedOn)
                                     .Where(x => !x.IsDeleted)
                                     .ToListAsync();
        }

        public async Task<Post> GetByIdAsync(string id)
        {
            return await this.db.Posts.AsNoTracking().
                           Where(x => x.Id == id && !x.IsDeleted).
                           FirstOrDefaultAsync();
        }
    }
}
