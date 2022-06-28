using Microsoft.AspNetCore.Identity;

namespace ForumApi.Models
{
    public class ForumRole : IdentityRole
    {
        public ForumRole() : this(null)
        {

        }

        public ForumRole(string name) :base(name)
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }
}
