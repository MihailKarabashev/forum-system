namespace ForumApi.Dtos.Post
{
    public class CreatePostModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public int[] Tags { get; set; }
    }
}
