using ForumApi.Dtos.Tag;

namespace ForumApi.Dtos.Category
{
    public class ReadCategoryModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Threads { get; set; }

        public IEnumerable<ReadTagModel> SimilarTags { get; set; }
    }
}
