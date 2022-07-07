using ForumApi.Models;

namespace ForumApi.Services
{
    public interface ICategoriesService
    {
        Task<IEnumerable<Category>> GetAllAsync();
    }
}
