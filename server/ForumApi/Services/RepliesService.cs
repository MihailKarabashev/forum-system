using ForumApi.Data;
using ForumApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class RepliesService : IRepliesService
    {
        private readonly ForumDbContext db;

        public RepliesService(ForumDbContext db)
        {
            this.db = db;
        }

        public async Task<Reply> CreateAsync(string description, int? parentId, string postId, string authorId)
        {
            var reply = new Reply
            {
                Description = description,
                ParentId = parentId,
                PostId = postId,
                AuthorId = authorId,
                CreatedOn = DateTime.UtcNow
            };

            await this.db.Replies.AddAsync(reply);
            await this.db.SaveChangesAsync();

            return reply;
        }

        public async Task DeleteAsync(int id)
        {
            var reply = await this.GetByIdAsync(id);

            reply.IsDeleted = true;
            reply.DeletedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
            await this.DeleteNestedRepliesAsync(id);
        }

        public async Task EditAsync(int id, string description)
        {
            var reply = await this.GetByIdAsync(id);

            
            reply.Description = description;
            reply.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Reply>> GetAllByPostIdAsync(string postId)
        {
            return  await this.db.Replies
                .AsNoTracking()
                .Where(r => r.PostId == postId && !r.IsDeleted)
                .Take(5)
                .Include(a => a.Author)
                .Include(x => x.Parent)
                .ThenInclude(x => x.Author)
                .OrderBy(r => r.CreatedOn)
                .ToListAsync();

            //return this.GetCleanReplies(replies);
        }

        public async Task<Reply> GetByIdAsync(int id)
        {
            return await this.db.Replies
                .AsNoTracking()
                .Include(a => a.Author)
                .Include(x=> x.Parent)
                .Where(r => r.Id == id && !r.IsDeleted)
                .FirstOrDefaultAsync();
        }


        private async Task DeleteNestedRepliesAsync(int id)
        {
            var nestedReply = await this.db.Replies.FirstOrDefaultAsync(r => r.ParentId == id && !r.IsDeleted);
            if (nestedReply == null)
            {
                return;
            }

            nestedReply.IsDeleted = true;
            nestedReply.DeletedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
            await this.DeleteNestedRepliesAsync(nestedReply.Id);
        }

        private IEnumerable<Reply> GetCleanReplies(IEnumerable<Reply> replies)
        {
            var repliesWithParents = replies.Where(x => x.ParentId != null).ToList();

            var cleanReplies = replies
                .Where(x => repliesWithParents.Any(y => x.Id != y.ParentId)).ToList();

            return cleanReplies;
        }
    }
}
