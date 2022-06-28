using ForumApi.Dtos.User;
using ForumApi.Models;

namespace ForumApi.Services
{
    public interface IUsersService
    {
        Task RegisterAsync(RegisterRequestModel model);

        Task<string> GenerateJwtToken(ForumUser user);

        Task<LoginResponseModel> LoginAsync(LoginRequestModel model);
    }
}
