namespace ForumApi.Dtos.Reaction
{
    public class ReadReactionsCountModel
    {
        public int Likes { get; set; }

        public int Dislikes { get; set; }

        public bool IsLiked { get; set; }

        public bool IsDisliked { get; set; }
    }
}
