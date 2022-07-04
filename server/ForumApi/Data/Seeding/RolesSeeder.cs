using ForumApi.Models;
using Microsoft.AspNetCore.Identity;

namespace ForumApi.Data.Seeding
{
    internal class RolesSeeder : ISeeder
    {
        public async Task SeedAsync(ForumDbContext dbContext, IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ForumRole>>();

            await SeedRoleAsync(roleManager, "Admin");
            // await SeedRoleASync(rolemanager", "User")
        }

        private static async Task SeedRoleAsync(RoleManager<ForumRole> roleManager, string roleName)
        {
            var role = await roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                var result = await roleManager.CreateAsync(new ForumRole(roleName));
                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }
            }
        }


    }
}
