using ForumApi.Models;

namespace ForumApi.Services
{
    public interface IPostService
    {
        Task<Post> CreateAsync(string title, string description, string authorId, int categoryId);

        Task EditAsync(string id, string title, string description, int categoryId);

        Task DeleteAsync(string id);

        Task<Post> GetByIdAsync(string id);

        // create pagination, sorting , filtering
        Task<IEnumerable<Post>> GetAllAsync();

    }
}
