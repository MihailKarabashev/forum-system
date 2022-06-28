namespace ForumApi.Dtos.Post
{
    public class ReadPostModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string AuthorId { get; set; }

        public int CategoryId { get; set; }
    }
}
