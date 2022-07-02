namespace ForumApi.Dtos.Reply
{
    public class ReadReplyDto
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public int? ParentId { get; set; }

        public string PostId { get; set; }

        public string AuthorId { get; set; }

        public string CreatedOn { get; set; }

        public string AuthorUserName { get; set; }
    }
}
