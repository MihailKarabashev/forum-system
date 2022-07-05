using ForumApi.Data;
using ForumApi.Dtos.User;
using ForumApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ForumApi.Services
{
    public class UsersService : IUsersService
    {
        private readonly ForumDbContext db;
        private readonly UserManager<ForumUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IHttpContextAccessor httpContextAccesor;

        public UsersService(
            ForumDbContext db,
            UserManager<ForumUser> userManager,
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccesor)
        {
            this.db = db;
            this.userManager = userManager;
            this.configuration = configuration;
            this.httpContextAccesor = httpContextAccesor;
        }

        public async Task<string> GenerateJwtToken(ForumUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.configuration["Jwt:Key"]);

            List<string> roles = (await this.userManager.GetRolesAsync(user)).ToList();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Claims = new Dictionary<string, object>()
                {
                    { ClaimTypes.NameIdentifier, user.Id },
                    { ClaimTypes.Name, user.UserName },
                    { ClaimTypes.Email, user.Email },
                },
                Issuer = this.configuration["Jwt:Issuer"],
                Audience = this.configuration["Jwt:Audience"],
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };


            foreach (string role in roles)
            {
                tokenDescriptor.Claims.Add(ClaimTypes.Role, role);
            }

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;

        }

        public async Task<ForumUser> GetCurrentLoggedInUser()
        {
            return await userManager.GetUserAsync(this.httpContextAccesor.HttpContext.User);
        }

        public async Task<AuthResponseModel> LoginAsync(LoginRequestModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                throw new NullReferenceException("User does not exsist");
            }

            var checkPassword = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!checkPassword)
            {
                throw new ArgumentException("Incorect Email or Password");
            }

            var generateToken = await this.GenerateJwtToken(user);

            var userRole = await userManager.GetRolesAsync(user);

            this.db.Users.Update(user);

            await this.db.SaveChangesAsync();

            return new AuthResponseModel
            {
                Username = user.UserName,
                Token = generateToken,
                Email = model.Email,
                RoleName = userRole[0]
            };
        }

        public async Task<AuthResponseModel> RegisterAsync(RegisterRequestModel model)
        {
            var user = new ForumUser()
            {
                UserName = model.Username,
                Email = model.Email,
                ProfilePicture = ""
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            // implement try/catch in global middleware
            if (!result.Succeeded)
            {
                throw new Exception("Register => Something happened bro.");
            }

            await userManager.AddToRoleAsync(user, "User");

            var generateToken = await this.GenerateJwtToken(user);

            return new AuthResponseModel
            {
                Username = model.Username,
                Email = model.Email,
                Token = generateToken,
                RoleName = "User"
            };
        }
    }
}
