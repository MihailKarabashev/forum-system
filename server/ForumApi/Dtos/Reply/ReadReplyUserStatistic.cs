namespace ForumApi.Dtos.Reply
{
    public class ReadReplyUserStatistic
    {
        public int Id { get; set; }

        public string PostId { get; set; }

        public string PostTitle { get; set; }


        public string Description { get; set; }


        public string AuthorUserName { get; set; }


        public string CategoryName { get; set; }

        public string PostViews { get; set; }
    }
}
