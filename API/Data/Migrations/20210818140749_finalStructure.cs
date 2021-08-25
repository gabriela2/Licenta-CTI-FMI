using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class finalStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChangePasswordTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users_X_RoleTypes",
                table: "Users_X_RoleTypes");

            migrationBuilder.DropColumn(
                name: "LastActivity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DeletedByReceiver",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "DeletedBySender",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Users_X_RoleTypes",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users_X_RoleTypes",
                table: "Users_X_RoleTypes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_X_RoleTypes_UserId",
                table: "Users_X_RoleTypes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users_X_RoleTypes",
                table: "Users_X_RoleTypes");

            migrationBuilder.DropIndex(
                name: "IX_Users_X_RoleTypes_UserId",
                table: "Users_X_RoleTypes");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Users_X_RoleTypes");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastActivity",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "DeletedByReceiver",
                table: "Messages",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "DeletedBySender",
                table: "Messages",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users_X_RoleTypes",
                table: "Users_X_RoleTypes",
                columns: new[] { "UserId", "RoleTypeId" });

            migrationBuilder.CreateTable(
                name: "ChangePasswordTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Used = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangePasswordTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangePasswordTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChangePasswordTokens_UserId",
                table: "ChangePasswordTokens",
                column: "UserId");
        }
    }
}
