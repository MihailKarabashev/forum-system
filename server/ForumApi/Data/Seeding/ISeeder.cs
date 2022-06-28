namespace ForumApi.Data.Seeding
{
    public interface ISeeder
    {
        Task SeedAsync(ForumDbContext dbContext, IServiceProvider serviceProvider);
    }
}
