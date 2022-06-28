using ForumApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Data.Seeding
{
    internal class UserSeeder : ISeeder
    {
        public async Task SeedAsync(ForumDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetService<UserManager<ForumUser>>();

            var isExisting = await userManager.Users.AnyAsync(u => u.UserName == "pesho");
            if (!isExisting)
            {
                var testUser = new ForumUser
                {
                    UserName = "pesho",
                    Email = "pesho@abv.bg",
                    ProfilePicture = "",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(testUser, "123456");
                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}
