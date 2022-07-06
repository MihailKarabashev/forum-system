namespace ForumApi.Models
{
    public interface IReactionData
    {
        bool IsLiked { get; set; }

        bool IsDisliked { get; set; }
    }
}
