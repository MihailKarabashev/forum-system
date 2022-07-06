using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ForumApi.Migrations
{
    public partial class AddReactionData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDisliked",
                table: "ReplyReactions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsLiked",
                table: "ReplyReactions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDisliked",
                table: "PostReactions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsLiked",
                table: "PostReactions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDisliked",
                table: "ReplyReactions");

            migrationBuilder.DropColumn(
                name: "IsLiked",
                table: "ReplyReactions");

            migrationBuilder.DropColumn(
                name: "IsDisliked",
                table: "PostReactions");

            migrationBuilder.DropColumn(
                name: "IsLiked",
                table: "PostReactions");
        }
    }
}
