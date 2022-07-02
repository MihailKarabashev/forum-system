﻿using ForumApi.Models;

namespace ForumApi.Services
{
    public interface IRepliesService
    {
        Task<Reply> CreateAsync(string description, int? parentId, string postId, string authorId);

        Task EditAsync(int id, string descriptions);

        Task DeleteAsync(int id);

        Task<IEnumerable<Reply>> GetAllByPostIdAsync(string postId);

        Task<Reply> GetByIdAsync(int id);
    }
}
