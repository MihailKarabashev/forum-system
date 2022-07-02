﻿using AutoMapper;
using ForumApi.Dtos.Post;
using ForumApi.Dtos.Reply;
using ForumApi.Models;
using System.Globalization;

namespace ForumApi.Profiles.Post
{
    public class ForumSystemProfile : Profile
    {
        public ForumSystemProfile()
        {
            this.CreateMap<ForumApi.Models.Post, ReadPostModel>()
                .ForMember(
                      x => x.RepliesCount,
                      y => y.MapFrom(src => src.Replies.Count()))
                .ForMember(
                      x => x.CategoryName,
                      y => y.MapFrom(src => src.Category.Name))
                .ForMember(
                      x => x.CreatedOn,
                      y => y.MapFrom(src => src.CreatedOn.ToString("yyyy/mm/dd",CultureInfo.GetCultureInfo("en-US"))));
            this.CreateMap<CreatePostModel,ForumApi.Models.Post>();
            this.CreateMap<EditPostModel,ForumApi.Models.Post>();


            this.CreateMap<Reply, ReadReplyDto>()
                .ForMember(
                      x=> x.AuthorUserName,
                      y=> y.MapFrom(src => src.Author.UserName))
                .ForMember(
                      x => x.CreatedOn,
                      y => y.MapFrom(src => src.CreatedOn.ToString("yyyy/mm/dd", CultureInfo.GetCultureInfo("en-US"))));
            this.CreateMap<CreateReplyDto, Reply>();

          
        }
    }
}