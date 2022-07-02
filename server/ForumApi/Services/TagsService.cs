using ForumApi.Data;
using ForumApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class TagsService : ITagsService
    {
        private readonly ForumDbContext db;

        public TagsService(ForumDbContext db)
        {
            this.db = db;
        }

        public async Task<Tag> CreateAsync(string name)
        {
            var tag = new Tag { Name = name, CreatedOn = DateTime.UtcNow };

            await this.db.Tags.AddAsync(tag);
            await this.db.SaveChangesAsync();

            return tag;
        }

        public async Task DeleteAsync(int id)
        {
            var tag = await this.GetByIdAsync(id);

            tag.IsDeleted = true;
            tag.DeletedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Tag>> GetAllByPostIdAsync(string postId)
        {
            return await this.db.Tags
                .AsNoTracking()
                .Where(x => x.Posts.Any(y => y.Id == postId && !y.IsDeleted))
                .ToListAsync();
        }

        public async Task<Tag> GetByIdAsync(int id)
        {
           return await this.db.Tags
                .AsNoTracking()
                .Where(t => t.Id == id && !t.IsDeleted)
                .FirstOrDefaultAsync();
        }
    }
}
