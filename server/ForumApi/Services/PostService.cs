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

        public async Task<Post> CreateAsync(string title, string description, string authorId, int categoryId, IEnumerable<int> tags)
        {
            var post = new Post
            {
                Title = title,
                Description = description,
                AuthorId = authorId,
                CategoryId = categoryId,
                CreatedOn = DateTime.UtcNow
            };

            foreach (var tagId in tags)
            {
                post.Tags.Add(new PostTag()
                {
                    TagId = tagId,
                    PostId = post.Id,
                });
            }


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

        //Add PAGINATION
        //Take outside of include takes the posts number
        public async Task<IEnumerable<Post>> GetAllAsync()
        {
            return await this.db.Posts.AsNoTracking()
                                     .Include(x=> x.Category)
                                     .Include(x=> x.Author)
                                     .Include(x=> x.Replies)
                                     .Include(x => x.Tags.Take(2))
                                     .OrderBy(x => x.CreatedOn)
                                     .Where(x => !x.IsDeleted)
                                     .ToListAsync();
        }

        public async Task<Post> GetByIdAsync(string id)
        {
            return await this.db.Posts
                           .Include(x => x.Category)
                           .Include(x => x.Author)
                           .Include(x => x.Replies)
                           .Where(x => x.Id == id && !x.IsDeleted)
                           .FirstOrDefaultAsync();
        }

        public async Task<string> GetLatestActivityByIdAsync(string id)
        {
            var latestPostReply = await this.db.Posts
                .Where(p => p.Id == id && !p.IsDeleted)
                .SelectMany(p => p.Replies)
                .Where(r => !r.IsDeleted)
                .OrderByDescending(r => r.CreatedOn)
                .FirstOrDefaultAsync(r => r.PostId == id);

            var currentTime = DateTime.UtcNow;

            if (latestPostReply != null)
            {
                var latestPostReplyActivity = this.CalculateLatestActivity(currentTime, latestPostReply.CreatedOn);
                return latestPostReplyActivity;
            }

            var post = await this.GetByIdAsync(id);
            var postLatestActivity = this.CalculateLatestActivity(currentTime, post.CreatedOn);

            return postLatestActivity;
        }

        public async Task<int> ViewAsync(string id)
        {
            var post = await this.GetByIdAsync(id);

            post.Views++;

            await this.db.SaveChangesAsync();

            return post.Views;
        }

        private string CalculateLatestActivity(DateTime currentTime, DateTime latestPostTime)
        {
            const decimal totalDays = 365.25m;
            const char yearsPostfix = 'y';
            const char daysPostfix = 'd';
            const char hoursPostfix = 'h';
            const char minutesPostfix = 'm';

            var activity = currentTime - latestPostTime;
            var daysFromNow = activity.Days;
            var hoursFromNow = activity.Hours;
            var minutesFromNow = activity.Minutes;
            var years = (int)(daysFromNow / totalDays);

            var result = $"{years}{yearsPostfix}";

            if (years > 0)
            {
                return result;
            }

            if (daysFromNow != 0)
            {
                result = $"{daysFromNow}{daysPostfix}";
            }
            else
            {
                result = hoursFromNow == 0 ? $"{minutesFromNow}{minutesPostfix}" : $"{hoursFromNow}{hoursPostfix}";
            }

            return result;
        }
    }
}
