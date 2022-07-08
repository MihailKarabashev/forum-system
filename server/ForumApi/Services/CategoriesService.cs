using ForumApi.Data;
using ForumApi.Dtos.Category;
using ForumApi.Dtos.Tag;
using ForumApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly ForumDbContext db;

        public CategoriesService(ForumDbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<ReadCategoryModel>> GetAllAsync()
        {
            var categoriesDto = new List<ReadCategoryModel>();
            var categories = await this.db.Categories.AsNoTracking().Take(6).ToListAsync();


            foreach (var category in categories)
            {
                categoriesDto.Add(new ReadCategoryModel
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description,
                    Threads = await this.GetThreads(category.Id),
                    SimilarTags = await this.GetSimilarTagsByCategoryId(category.Id),
                });
            }

            return categoriesDto;
        }
        private async Task<int> GetThreads(int categoryId)
        {
            return await this.db.Posts
                 .AsNoTracking()
                 .Where(x=> x.CategoryId == categoryId)
                 .CountAsync();
        }

        private async Task<IEnumerable<ReadTagModel>> GetSimilarTagsByCategoryId(int categoryId)
        {
            var tags = new List<ReadTagModel>();

            var postTags = await this.db.PostsTags
                .Include(x => x.Tag)
                .Where(entry => entry.Post.CategoryId == categoryId)
                .Select(x => x.Tag)
                .ToListAsync();


            foreach (var tag in postTags)
            {
                tags.Add(new ReadTagModel
                {
                    Id = tag.Id,
                    Name = tag.Name,
                });
            }

            return tags;
        }
    }
}
