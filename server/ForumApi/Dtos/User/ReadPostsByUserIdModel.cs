using ForumApi.Dtos.Tag;

namespace ForumApi.Dtos.User
{
    public class ReadPostsByUserIdModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string AuthorUserName { get; set; }

        public string CategoryName { get; set; }

        public int RepliesCount { get; set; }

        public string Activity { get; set; }

        public int LikesCount { get; set; }

        public int Views { get; set; }

        public IEnumerable<ReadTagModel> Tags { get; set; }
    }
}
