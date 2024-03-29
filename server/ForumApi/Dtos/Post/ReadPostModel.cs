﻿using ForumApi.Dtos.Reaction;
using ForumApi.Dtos.Reply;
using ForumApi.Dtos.Tag;

namespace ForumApi.Dtos.Post
{
    public class ReadPostModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string AuthorId { get; set; }

        public string AuthorUserName { get; set; }

        public string CategoryName { get; set; }

        public int CategoryId { get; set; }

        public int RepliesCount { get; set; }

        public string Activity { get; set; }

        public int Views { get; set; }

        public IEnumerable<ReadReplyDto> Replies { get; set; }

        public IEnumerable<ReadTagModel> Tags { get; set; }

        public ReadReactionsCountModel Reaction { get; set; }

    }
}
