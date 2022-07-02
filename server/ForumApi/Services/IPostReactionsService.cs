using ForumApi.Dtos.Reaction;
using ForumApi.Models.Enums;

namespace ForumApi.Services
{
    public interface IPostReactionsService
    {
        Task<ReadReactionsCountModel> ReactAsync(ReactionType reactionType, string postId, string authorId);

        Task<ReadReactionsCountModel> GetCountByPostIdAsync(string postId);
    }
}
