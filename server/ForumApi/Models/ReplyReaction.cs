﻿using ForumApi.Models.Enums;

namespace ForumApi.Models
{
    public class ReplyReaction : IReactionData
    {
        public int Id { get; set; }

        public ReactionType ReactionType { get; set; }

        public int ReplyId { get; set; }

        public Reply Reply { get; set; }

        public string AuthorId { get; set; }

        public ForumUser Author { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsLiked { get; set; }

        public bool IsDisliked { get; set; }
    }
}
