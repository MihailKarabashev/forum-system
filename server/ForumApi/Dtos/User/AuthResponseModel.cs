﻿namespace ForumApi.Dtos.User
{
    public class AuthResponseModel
    {
        public string Id { get; set; }

        public string Token { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public string RoleName { get; set; }
    }
}
