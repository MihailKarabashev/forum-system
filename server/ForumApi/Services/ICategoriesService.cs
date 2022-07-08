using ForumApi.Dtos.Category;
using ForumApi.Dtos.Tag;
using ForumApi.Models;

namespace ForumApi.Services
{
    public interface ICategoriesService
    {
        Task<IEnumerable<ReadCategoryModel>> GetAllAsync();
    }
}
