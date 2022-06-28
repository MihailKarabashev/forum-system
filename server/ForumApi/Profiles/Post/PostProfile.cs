using AutoMapper;
using ForumApi.Dtos.Post;

namespace ForumApi.Profiles.Post
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<ForumApi.Models.Post, ReadPostModel>().ReverseMap();
            CreateMap<CreatePostModel,ForumApi.Models.Post>();
            CreateMap<EditPostModel,ForumApi.Models.Post>();
        }
    }
}
