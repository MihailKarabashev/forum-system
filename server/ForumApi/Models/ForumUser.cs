using Microsoft.AspNetCore.Identity;

namespace ForumApi.Models
{
    public class ForumUser : IdentityUser
    {
        public ForumUser()
        {
            this.Id = Guid.NewGuid().ToString();
  
        }
        public string ProfilePicture { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public ICollection<Post> Posts { get; set; } = new HashSet<Post>();
        public ICollection<Reply> Replies { get; set; } = new HashSet<Reply>();
        public ICollection<PostReaction> PostReactions { get; set; } = new HashSet<PostReaction>();
        public ICollection<ReplyReaction> ReplyReactions { get; set; } = new HashSet<ReplyReaction>();


        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }
              = new HashSet<IdentityUserRole<string>>();

    }
}
