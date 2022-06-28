using System.ComponentModel.DataAnnotations;

namespace ForumApi.Models
{
    public class Reply
    {
        [Key]
        public int Id { get; set; }

        public string Description { get; set; }

        public int? ParentId { get; set; }

        public Reply Parent { get; set; }

        public string PostId { get; set; }

        public Post Post { get; set; }

        public string AuthorId { get; set; }

        public ForumUser Author { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

    }
}
