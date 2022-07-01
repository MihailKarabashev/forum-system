using AutoMapper;
using ForumApi.Dtos.Post;
using System.Globalization;

namespace ForumApi.Profiles.Post
{
    public class PostProfile : Profile
    {
        public PostProfile()
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

          
        }
    }
}
