using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using HelpAFamilyOfferAChance.API.Data;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Seed
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync())
            {
                return;
            }
            var userData = await System.IO.File.ReadAllTextAsync("Data/Seed/Users.json");
            var users = JsonSerializer.Deserialize<List<User>>(userData);
            var roles = new List<RoleType>{
                new RoleType{Name="Member", Description="Un membru are access la functionalitatile de baza ale aplicatiie"},
                new RoleType{Name="Admin", Description="Un admin poate modifica drepturile celorlalti useri; poate face moficari in ceea ce priveste tabelele de referinta"},
                new RoleType{Name="Moderator", Description="Un moderator poate aproba sau respinge strangerile de fonduri"}
            };
            

            foreach(var role in roles){
                context.RoleTypes.Add(role);
            }
            await context.SaveChangesAsync();

            using var hmac = new HMACSHA512();
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
            }

            await context.SaveChangesAsync();

            foreach(var user in users){
                context.Users_X_RoleTypes.Add(new User_x_RoleType{UserId=user.Id, RoleTypeId=roles[0].Id});
            }
            await context.SaveChangesAsync();

            var admin = new User{
                Email="ownerhelpafamilyofferachance@gmail.com",
                UserName="Admin",
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
            };
            context.Users.Add(admin);
            await context.SaveChangesAsync();

            foreach(var role in roles){
                if(role.Name!="Member"){
                context.Users_X_RoleTypes.Add(new User_x_RoleType{UserId=admin.Id, RoleTypeId=role.Id});
            }
            }

            await context.SaveChangesAsync();


        }

        public static async Task SeedAds(DataContext context)
        {
            if (await context.Ads.AnyAsync())
            {
                return;
            }
            var adsData = await System.IO.File.ReadAllTextAsync("Data/Seed/Ads.json");
            var ads = JsonSerializer.Deserialize<List<Ad>>(adsData);
            foreach (var ad in ads)
            {
                context.Ads.Add(ad);
            }

            await context.SaveChangesAsync();

        }

        public static async Task SeedUnitsOfMeasure(DataContext context)
        {
            if (await context.UnitsOfMeasure.AnyAsync())
            {
                return;
            }
            var unitsOfMeasureData = await System.IO.File.ReadAllTextAsync("Data/Seed/UnitsOfMeasure.json");
            var unitsOfMeasure = JsonSerializer.Deserialize<List<UnitOfMeasure>>(unitsOfMeasureData);
            foreach (var unitOfMeasure in unitsOfMeasure)
            {
                context.UnitsOfMeasure.Add(unitOfMeasure);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedCategories(DataContext context)
        {
            if (await context.Category.AnyAsync())
            {
                return;
            }
            var categoriesData = await System.IO.File.ReadAllTextAsync("Data/Seed/Categories.json");
            var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);
            foreach (var category in categories)
            {
                context.Category.Add(category);
            }

            await context.SaveChangesAsync();

        }
        public static async Task SeedDeliveryTypes(DataContext context)
        {
            if (await context.DeliveryTypes.AnyAsync())
            {
                return;
            }
            var deliveryTypesData = await System.IO.File.ReadAllTextAsync("Data/Seed/DeliveryTypes.json");
            var deliveryTypes = JsonSerializer.Deserialize<List<DeliveryType>>(deliveryTypesData);
            foreach (var deliveryType in deliveryTypes)
            {
                context.DeliveryTypes.Add(deliveryType);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedAdsDeliveryTypes(DataContext context)
        {
            if (await context.Ads_X_DeliveryTypes.AnyAsync())
            {
                return;
            }
            var adsDeliveryTypesData = await System.IO.File.ReadAllTextAsync("Data/Seed/AdsDeliveryTypes.json");
            var adsDeliveryTypes = JsonSerializer.Deserialize<List<Ad_x_DeliveryType>>(adsDeliveryTypesData);
            foreach (var adDeliveryType in adsDeliveryTypes)
            {
                context.Ads_X_DeliveryTypes.Add(adDeliveryType);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedFundraisers(DataContext context)
        {
            if(await context.Fundraisers.AnyAsync())
            {
                return;
            }
            var fundraisersData = await System.IO.File.ReadAllTextAsync("Data/Seed/Fundraisers.json");
            var fundraisers = JsonSerializer.Deserialize<List<Fundraiser>>(fundraisersData);
            foreach(var fundraiser in fundraisers)
            {
                context.Fundraisers.Add(fundraiser);
            }
            await context.SaveChangesAsync();

        }
        

        

       



    }
}