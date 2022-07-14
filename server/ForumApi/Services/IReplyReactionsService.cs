using ForumApi.Dtos.Reaction;
using ForumApi.Models.Enums;

namespace ForumApi.Services
{
    public interface IReplyReactionsService
    {
        Task<ReadReactionsCountModel> ReactAsync(ReactionType reactionType, int replyId, string authorId);

        Task<ReadReactionsCountModel> GetCountByReplyIdAsync(int replyId);
    }
}
