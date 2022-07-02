using ForumApi.Dtos.Reply;

namespace ForumApi.Dtos.Post
{
    public class ReadPostModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string AuthorId { get; set; }

        public string CategoryName { get; set; }

        public int CategoryId { get; set; }

        public int RepliesCount { get; set; }

        public string CreatedOn { get; set; }

        public IEnumerable<ReadReplyDto> Replies { get; set; }
    }
}
