using ForumApi.Data;
using ForumApi.Dtos.Reaction;
using ForumApi.Models;
using ForumApi.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class PostReactionsService : IPostReactionsService
    {
        private readonly ForumDbContext db;

        public PostReactionsService(ForumDbContext db)
        {
            this.db = db;
        }


        public async Task<ReadReactionsCountModel> ReactAsync(ReactionType reactionType, string postId, string authorId)
        {
            var postReaction = await this.db.PostReactions.
                Where(x => x.PostId == postId && x.AuthorId == authorId)
                .FirstOrDefaultAsync();

            if (postReaction == null)
            {
                postReaction = new PostReaction()
                {
                    ReactionType = reactionType,
                    PostId = postId,
                    AuthorId = authorId,
                    CreatedOn = DateTime.UtcNow
                };

                await this.db.PostReactions.AddAsync(postReaction);
            }
            else
            {
                postReaction.ModifiedOn = DateTime.UtcNow;
                postReaction.ReactionType = postReaction.ReactionType == reactionType
                   ? ReactionType.Neutral
                   : reactionType;
            }

            await this.db.SaveChangesAsync();

            return await this.GetCountByPostIdAsync(postId);
        }

        public async Task<ReadReactionsCountModel> GetCountByPostIdAsync(string postId)
        {
            return new ReadReactionsCountModel()
            {
                Likes = await this.GetCountByTypeAndPostIdAsync(ReactionType.Like, postId),
                Dislikes = await this.GetCountByTypeAndPostIdAsync(ReactionType.DisLike, postId),
            };
        }


        private async Task<int> GetCountByTypeAndPostIdAsync(ReactionType type, string postId)
        {
            return await this.db.PostReactions
                   .Where(x => x.PostId == postId && !x.Post.IsDeleted)
                   .CountAsync(x => x.ReactionType == type);
        }
    }

}
