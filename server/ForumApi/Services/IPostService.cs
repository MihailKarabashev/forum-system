using ForumApi.Models;
using System.Collections.Generic;

namespace ForumApi.Services
{
    public interface IPostService
    {
        Task<Post> CreateAsync(string title, string description, string authorId, int categoryId, IEnumerable<int> tags);

        Task EditAsync(string id, string title, string description, int categoryId);

        Task DeleteAsync(string id);

        Task<Post> GetByIdAsync(string id);

        // create pagination, sorting , filtering
        Task<IEnumerable<Post>> GetAllAsync();

        Task<string> GetLatestActivityByIdAsync(string id);

         Task<int> ViewAsync(string id);
    }
}
