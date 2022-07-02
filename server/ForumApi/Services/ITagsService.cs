using ForumApi.Models;

namespace ForumApi.Services
{
    public interface ITagsService
    {
        Task<Tag> CreateAsync(string name);

        Task DeleteAsync(int id);

        Task<Tag> GetByIdAsync(int id);

        Task<IEnumerable<Tag>> GetAllByPostIdAsync(string postId);
    }
}
