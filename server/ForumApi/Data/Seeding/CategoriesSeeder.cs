﻿using ForumApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Data.Seeding
{
    internal class CategoriesSeeder : ISeeder
    {
        public async Task SeedAsync(ForumDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (await dbContext.Categories.AnyAsync())
            {
                return;
            }

            var categories = new List<Category>
            {
                new Category { Name = "Sports", CreatedOn = DateTime.UtcNow },
                new Category { Name = "Programming", CreatedOn = DateTime.UtcNow },
                new Category { Name = "News", CreatedOn = DateTime.UtcNow },
                new Category { Name = "Gaming", CreatedOn = DateTime.UtcNow },
                new Category { Name = "Health & Fitness", CreatedOn = DateTime.UtcNow },
                new Category { Name = "Music", CreatedOn = DateTime.UtcNow },
                new Category { Name = "Cars", CreatedOn = DateTime.UtcNow }
            };

            await dbContext.AddRangeAsync(categories);
        }
    }
}
