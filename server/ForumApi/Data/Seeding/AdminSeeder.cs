using ForumApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Data.Seeding
{
    internal class AdminSeeder : ISeeder
    {
        public async Task SeedAsync(ForumDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetService<UserManager<ForumUser>>();
            var roleManager = serviceProvider.GetService<RoleManager<ForumRole>>();

            var isExisting = await userManager.Users.AnyAsync(u => u.UserName == "Admin");
            if (!isExisting)
            {
                var admin = new ForumUser
                {
                    UserName = "Admin",
                    Email = "admin@abv.bg",
                    ProfilePicture = "",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(admin, "123456");
                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }

                var isRoleExists = await roleManager.RoleExistsAsync("Admin");
                if (isRoleExists)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}
