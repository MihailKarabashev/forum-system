using ForumApi.Dtos.Reaction;

namespace ForumApi.Dtos.Reply
{
    public class ReadReplyDto
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public string ParentAuthorUserName { get; set; }

        public string ParentDescription { get; set; }

        public int? ParentId { get; set; }

        public string PostId { get; set; }

        public string AuthorId { get; set; }

        public string AuthorUserName { get; set; }

        public string CreatedOn { get; set; }

        public ReadReactionsCountModel Reaction { get; set; }
    }
}
