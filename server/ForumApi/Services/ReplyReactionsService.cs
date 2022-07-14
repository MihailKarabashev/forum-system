using ForumApi.Data;
using ForumApi.Dtos.Reaction;
using ForumApi.Models;
using ForumApi.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class ReplyReactionsService : IReplyReactionsService
    {
        private readonly ForumDbContext db;

        public ReplyReactionsService(ForumDbContext db)
        {
            this.db = db;

        }

        public async Task<ReadReactionsCountModel> ReactAsync(ReactionType reactionType, int replyId, string authorId)
        {
            var replyReactions = await this.db.ReplyReactions.
             Where(x => x.ReplyId == replyId && x.AuthorId == authorId)
             .FirstOrDefaultAsync();

            if (replyReactions == null)
            {
                replyReactions = new ReplyReaction()
                {
                    ReactionType = reactionType,
                    ReplyId = replyId,
                    AuthorId = authorId,
                    CreatedOn = DateTime.UtcNow,
                };

                await this.db.ReplyReactions.AddAsync(replyReactions);
            }
            else
            {
                replyReactions.ModifiedOn = DateTime.UtcNow;
                replyReactions.ReactionType = replyReactions.ReactionType == reactionType
                   ? ReactionType.Neutral
                   : reactionType;
            }

            var reaction = ((int)replyReactions.ReactionType);

            this.SetReactionType(reaction, replyReactions);

            await this.db.SaveChangesAsync();

            var reactionModel = await this.GetCountByReplyIdAsync(replyId);

            reactionModel.IsLiked = replyReactions.IsLiked;
            reactionModel.IsDisliked = replyReactions.IsDisliked;

            return reactionModel;


        }


        public async Task<ReadReactionsCountModel> GetCountByReplyIdAsync(int replyId)
        {
            return new ReadReactionsCountModel()
            {
                Likes = await this.GetCountByTypeAndPostIdAsync(ReactionType.Like, replyId),
                Dislikes = await this.GetCountByTypeAndPostIdAsync(ReactionType.DisLike, replyId),
                IsLiked = await this.db.ReplyReactions.Where(x => x.ReplyId == replyId).Select(x => x.IsLiked).FirstOrDefaultAsync(),
                IsDisliked = await this.db.ReplyReactions.Where(x => x.ReplyId == replyId).Select(x => x.IsDisliked).FirstOrDefaultAsync()
            };
        }

        private async Task<int> GetCountByTypeAndPostIdAsync(ReactionType type, int replyId)
        {
            return await this.db.ReplyReactions
                   .Where(x => x.ReplyId == replyId && !x.Reply.IsDeleted)
                   .CountAsync(x => x.ReactionType == type);
        }

        private void SetReactionType(int reaction, ReplyReaction replyReaction)
        {
            if (reaction == 1)
            {
                replyReaction.IsLiked = true;
                replyReaction.IsDisliked = false;
            }
            if (reaction == 2)
            {
                replyReaction.IsDisliked = true;
                replyReaction.IsLiked = false;
            }
            if (reaction == 0)
            {
                replyReaction.IsDisliked = false;
                replyReaction.IsLiked = false;
            }
        }


    }
}
