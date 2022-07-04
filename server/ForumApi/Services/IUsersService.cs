﻿using ForumApi.Dtos.User;
using ForumApi.Models;

namespace ForumApi.Services
{
    public interface IUsersService
    {
        Task<AuthResponseModel> RegisterAsync(RegisterRequestModel model);

        Task<string> GenerateJwtToken(ForumUser user);

        Task<AuthResponseModel> LoginAsync(LoginRequestModel model);

        string GetCurrentLoggedInUserId();
    }
}
