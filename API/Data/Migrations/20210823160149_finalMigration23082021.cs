using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class finalMigration23082021 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Category_CategoryId",
                table: "Ads");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteList_Ads_AdId",
                table: "FavouriteList");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteList_Fundraisers_FundraiserId",
                table: "FavouriteList");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteList_Users_UserId",
                table: "FavouriteList");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavouriteList",
                table: "FavouriteList");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.RenameTable(
                name: "FavouriteList",
                newName: "FavouriteLists");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteList_UserId",
                table: "FavouriteLists",
                newName: "IX_FavouriteLists_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteList_FundraiserId",
                table: "FavouriteLists",
                newName: "IX_FavouriteLists_FundraiserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteList_AdId",
                table: "FavouriteLists",
                newName: "IX_FavouriteLists_AdId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavouriteLists",
                table: "FavouriteLists",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Categories_CategoryId",
                table: "Ads",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteLists_Ads_AdId",
                table: "FavouriteLists",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteLists_Fundraisers_FundraiserId",
                table: "FavouriteLists",
                column: "FundraiserId",
                principalTable: "Fundraisers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteLists_Users_UserId",
                table: "FavouriteLists",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Categories_CategoryId",
                table: "Ads");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteLists_Ads_AdId",
                table: "FavouriteLists");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteLists_Fundraisers_FundraiserId",
                table: "FavouriteLists");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteLists_Users_UserId",
                table: "FavouriteLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavouriteLists",
                table: "FavouriteLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "FavouriteLists",
                newName: "FavouriteList");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteLists_UserId",
                table: "FavouriteList",
                newName: "IX_FavouriteList_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteLists_FundraiserId",
                table: "FavouriteList",
                newName: "IX_FavouriteList_FundraiserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteLists_AdId",
                table: "FavouriteList",
                newName: "IX_FavouriteList_AdId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavouriteList",
                table: "FavouriteList",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Category_CategoryId",
                table: "Ads",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteList_Ads_AdId",
                table: "FavouriteList",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteList_Fundraisers_FundraiserId",
                table: "FavouriteList",
                column: "FundraiserId",
                principalTable: "Fundraisers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteList_Users_UserId",
                table: "FavouriteList",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
