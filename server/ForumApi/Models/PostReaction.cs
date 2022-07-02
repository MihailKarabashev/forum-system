using ForumApi.Models.Enums;

namespace ForumApi.Models
{
    public class PostReaction
    {
        public int Id { get; set; }

        public ReactionType ReactionType { get; set; }

        public string PostId { get; set; }

        public Post Post { get; set; }

        public string AuthorId { get; set; }

        public ForumUser Author { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
