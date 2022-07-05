using AutoMapper;
using ForumApi.Data;
using ForumApi.Data.Seeding;
using ForumApi.Dtos.Post;
using ForumApi.Dtos.Reply;
using ForumApi.Dtos.Tag;
using ForumApi.Dtos.User;
using ForumApi.Models;
using ForumApi.Models.Enums;
using ForumApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(opt =>
    {
        opt.
            WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateActor = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = configuration["Jwt:Issuer"],
        ValidAudience = configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))


    };
    opt.Events = new JwtBearerEvents
    {
        OnChallenge = async context =>
        {
            context.HandleResponse();


            context.Response.StatusCode = 401;
            context.Response.Headers.Append("UnAuthorized", "User");
            context.Response.ContentType = "application/json";

            var errorResponse = new
            {
                Message = "You are not authorized !",
                StatusCode = context.Response.StatusCode,
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        },
    };

});

builder.Services.AddAuthorization();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<ForumDbContext>(opt =>
  opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDefaultIdentity<ForumUser>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 3;
    options.User.RequireUniqueEmail = true;
}).AddRoles<ForumRole>().AddEntityFrameworkStores<ForumDbContext>();

builder.Services.AddTransient<IPostService, PostService>();
builder.Services.AddTransient<IUsersService, UsersService>();
builder.Services.AddTransient<IRepliesService, RepliesService>();
builder.Services.AddTransient<ITagsService, TagsService>();
builder.Services.AddTransient<IPostReactionsService, PostReactionsService>();





var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

using var serviceScopeSeeder = ((IApplicationBuilder)app).ApplicationServices.CreateScope();
using var dbContextSeeder = serviceScopeSeeder.ServiceProvider.GetRequiredService<ForumDbContext>();

new ForumDbContextSeeder()
    .SeedAsync(dbContextSeeder, serviceScopeSeeder.ServiceProvider)
    .GetAwaiter()
    .GetResult();


app.MapGet("api/posts/{id}", async (string id,
    IMapper mapper,
    IPostService postService,
    ITagsService tagsService,
    IRepliesService repliesService,
    IPostReactionsService postReactionService) =>
{
    var post = await postService.GetByIdAsync(id);

    if (post == null)
    {
        return Results.NotFound();
    }
    var postDto = mapper.Map<ReadPostModel>(post);

    var replies = await repliesService.GetAllByPostIdAsync(id);

    var tags = await tagsService.GetAllByPostIdAsync(id);
    var reaction = await postReactionService.GetCountByPostIdAsync(post.Id);

    postDto.Replies = mapper.Map<IEnumerable<ReadReplyDto>>(replies);
    postDto.Tags = mapper.Map<IEnumerable<ReadTagModel>>(tags);
    postDto.Reaction = reaction;

    return Results.Ok(postDto);
});

app.MapGet("api/posts",
    async (IMapper mapper,
    IPostService postService,
    ITagsService tagsService,
    IPostReactionsService postReactionService) =>
{
    var posts = await postService.GetAllAsync();
    var postDtos = mapper.Map<IEnumerable<ReadPostModel>>(posts);


    foreach (var postDto in postDtos)
    {
        var postTag = await tagsService.GetAllByPostIdAsync(postDto.Id);
        var postReaction = await postReactionService.GetCountByPostIdAsync(postDto.Id);

        postDto.Tags = mapper.Map<IEnumerable<ReadTagModel>>(postTag);
        postDto.Reaction = postReaction;
    }

    return Results.Ok(postDtos);
});

app.MapDelete("api/posts/{id}",
    [Authorize]
async (string id, IMapper mapper, IPostService postService) =>
{
    var post = await postService.GetByIdAsync(id);

    if (post == null)
    {
        return Results.NotFound();
    }

    await postService.DeleteAsync(id);

    return Results.NoContent();
});


app.MapPost("api/posts",
    [Authorize]
async (IMapper mapper, IPostService postService, IUsersService userService, CreatePostModel dto) =>
{
    var author = await userService.GetCurrentLoggedInUser();

    var post = await postService.
                      CreateAsync(dto.Title, dto.Description, author.Id, dto.CategoryId);

    var postDto = mapper.Map<ReadPostModel>(post);

    return Results.Created($"/api/posts/{postDto.Id}", postDto);

});

app.MapPut("/api/posts",
    [Authorize]
async (string id, IPostService postService, EditPostModel dto) =>
{
    var post = await postService.GetByIdAsync(id);

    if (post == null)
    {
        return Results.NotFound();
    }

    await postService.EditAsync(id, dto.Title, dto.Description, dto.CategoryId);

    return Results.NoContent();

});

app.MapPost("/api/login",
    [AllowAnonymous]
async (IUsersService usersService, LoginRequestModel model) =>
{
    //Fluen Validation for model state

    var resultModel = await usersService.LoginAsync(model);


    return Results.Ok(resultModel);
});

app.MapPost(
    "/api/register",
    [AllowAnonymous]
async (IUsersService usersService, RegisterRequestModel model) =>
{
    // Fluent Validation for model state

    var resultModel = await usersService.RegisterAsync(model);

    return Results.Ok(resultModel);
});


// Replies
//check roles (administarator)

app.MapPost("/api/replies",
    [Authorize]
async (IMapper mapper,
    IRepliesService repliesService,
    IUsersService usersService,
    CreateReplyDto replyInput) =>
{
    var author =await usersService.GetCurrentLoggedInUser();

    var reply = await repliesService.CreateAsync(replyInput.Description, null, replyInput.PostId, author.Id);

    var replyDto = mapper.Map<ReadReplyDto>(reply);
    replyDto.AuthorUserName = author.UserName;


    return Results.Created($"/api/posts/{replyDto.PostId}", replyDto);
});

app.MapDelete("/api/replies/{id}",
    [Authorize]
async (int replyId,
    IRepliesService repliesService,
    IUsersService usersService) =>
{
    var reply = await repliesService.GetByIdAsync(replyId);

    if (reply == null)
    {
        return Results.NotFound();
    }

    //check wheather current logged in user is admin usersService.GetCurrentLoggedInUserId() == admin
    var user = await usersService.GetCurrentLoggedInUser();
    if (reply.AuthorId != user.Id)
    {
        return Results.Unauthorized();
    }

    await repliesService.DeleteAsync(replyId);

    return Results.NoContent();
});



//Post Reactions
//Add Authorization attribute
app.MapPost("/api/posts/reaction/like/{postId}", 
    [Authorize]
    async (IUsersService usersService, IPostReactionsService reactionsService, string postId) =>
{
    var user = await usersService.GetCurrentLoggedInUser();
    
    if (user.Id == null)
    {
        return Results.Unauthorized();
    }


    var reaction = await reactionsService.ReactAsync(ReactionType.Like, postId, user.Id);

    return Results.Created($"/api/posts/{postId}", reaction);
});


app.MapPost("/api/posts/reaction/dislike/{postId}",
    [Authorize]
    async (IUsersService usersService, IPostReactionsService reactionsService, string postId) =>
    {
        var user = await usersService.GetCurrentLoggedInUser();

        if (user.Id == null)
        {
            return Results.Unauthorized();
        }


        var reaction = await reactionsService.ReactAsync(ReactionType.DisLike, postId, user.Id);

        return Results.Created($"/api/posts/{postId}", reaction);
    });

app.Run();