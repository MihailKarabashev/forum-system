using AutoMapper;
using ForumApi.Data;
using ForumApi.Data.Seeding;
using ForumApi.Dtos.Post;
using ForumApi.Models;
using ForumApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

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

var app = builder.Build();

app.UseHttpsRedirection();

//using var serviceScopeMigration = ((IApplicationBuilder)app).ApplicationServices.CreateScope();
//using var dbContextMigration = serviceScopeMigration.ServiceProvider.GetRequiredService<ForumDbContext>();

//dbContextMigration.Database.Migrate();

using var serviceScopeSeeder = ((IApplicationBuilder)app).ApplicationServices.CreateScope();
using var dbContextSeeder = serviceScopeSeeder.ServiceProvider.GetRequiredService<ForumDbContext>();

new ForumDbContextSeeder()
    .SeedAsync(dbContextSeeder, serviceScopeSeeder.ServiceProvider)
    .GetAwaiter()
    .GetResult();


app.MapGet("api/posts/{id}", async (string id, IMapper mapper, IPostService postService) =>
{
    var post = await postService.GetByIdAsync(id);

    if (post == null)
    {
        return Results.NotFound();
    }
    var postDto = mapper.Map<ReadPostModel>(post);

    return Results.Ok(postDto);
});

app.MapGet("api/posts", async (IMapper mapper, IPostService postService) =>
{
    var posts = await postService.GetAllAsync();
    var postDto = mapper.Map<IEnumerable<ReadPostModel>>(posts);

    return Results.Ok(postDto);
});

app.MapDelete("api/posts/{id}", async (string id, IMapper mapper, IPostService postService) =>
{
    var post = await postService.GetByIdAsync(id);

    if (post == null)
    {
        return Results.NotFound();
    }

    await postService.DeleteAsync(id);

    return Results.NoContent();
});

app.MapPost("api/posts", async (IMapper mapper, IPostService postService, CreatePostModel dto) =>
{

    var post = await postService.
                      CreateAsync(dto.Title, dto.Description, "9d12223f-57d3-4ca5-aae6-6c569b0ac1e8", dto.CategoryId);

    var postDto = mapper.Map<ReadPostModel>(post);

    return Results.Created($"/api/posts/{postDto.Id}", postDto);

});

app.MapPut("/api/posts", async (string id, IPostService postService, EditPostModel dto) =>
{
    var post = await postService.GetByIdAsync(id);

    if (post == null)
    {
        return Results.NotFound();
    }

    await postService.EditAsync(id, dto.Title, dto.Description, dto.CategoryId);

    return Results.NoContent();

});

app.Run();