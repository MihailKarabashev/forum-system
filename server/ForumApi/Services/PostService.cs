using AutoMapper;
using ForumApi.Data;
using ForumApi.Dtos.Tag;
using ForumApi.Dtos.User;
using ForumApi.Models;
using ForumApi.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class PostService : IPostService
    {
        private readonly ForumDbContext db;
        private readonly IMapper mapper;

        public PostService(ForumDbContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
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
        public async Task<IEnumerable<Post>> GetAllAsync(string search = null)
        {
            var query = this.db.Posts.AsNoTracking()
                                      .Where(x=> !x.IsDeleted)
                                     .Include(x => x.Category)
                                     .Include(x => x.Author)
                                     .Include(x => x.Replies.Where(r=> !r.IsDeleted))
                                     .Include(x => x.Tags.Take(2))
                                     .Where(x => !x.IsDeleted);


            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p => p.Title.Contains(search));
            }

            return await query.OrderByDescending(x => x.CreatedOn).ToListAsync();

        }

        public  async Task<IEnumerable<ReadPostsByUserIdModel>> GetAllByUserIdAsync(string userId)
        {
            var posts = await this.db.Posts
                                      .Where(x=> x.AuthorId == userId)
                                      .Include(x => x.Category)
                                     .Include(x => x.Author)
                                     .Include(x => x.Replies)
                                     .Include(x => x.Tags)
                                     .Include(x=> x.PostReactions)
                                     .OrderBy(x => x.CreatedOn)
                                     .Where(x => !x.IsDeleted)
                                     .ToListAsync(); 


            var listOfDtos = new List<ReadPostsByUserIdModel>();


            foreach (var post in posts)
            {
                var tags = await
                    this.db.PostsTags.
                    Where(x => x.PostId == post.Id).
                    Select(x => x.Tag).
                    ToListAsync();


                listOfDtos.Add(new ReadPostsByUserIdModel
                {
                    Id = post.Id,
                    Title = post.Title,
                    Description = post.Description,
                    AuthorUserName = post.Author.UserName,
                    Activity = await this.GetLatestActivityByIdAsync(post.Id),
                    Views = post.Views,
                    CategoryName = post.Category.Name,
                    RepliesCount = post.Replies.Count(),
                    LikesCount = post.PostReactions.Where(x => x.ReactionType == ReactionType.Like).Count(),
                    Tags = mapper.Map<IEnumerable<ReadTagModel>>(tags),
                });
            }

            return listOfDtos;

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
