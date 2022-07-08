using System.ComponentModel.DataAnnotations;

namespace ForumApi.Models
{
    public class Post
    {
        [Key]
        public string Id = Guid.NewGuid().ToString();

        public string Title { get; set; }

        public string Description { get; set; }

        public string AuthorId { get; set; }

        public ForumUser Author { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }


        public ICollection<Reply> Replies = new HashSet<Reply>();

        public ICollection<PostTag> Tags { get; set; } = new HashSet<PostTag>();

        public ICollection<PostReaction> PostReactions { get; set; } = new HashSet<PostReaction>();

    }
}
