using ForumApi.Data;
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

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await this.db.Categories.AsNoTracking().ToListAsync();
        }
    }
}
