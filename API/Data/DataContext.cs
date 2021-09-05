using System.Linq;
using API.Entities;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpAFamilyOfferAChance.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<Fundraiser> Fundraisers { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UnitOfMeasure> UnitsOfMeasure { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DeliveryType> DeliveryTypes { get; set; }
        public DbSet<Ad_x_DeliveryType> Ads_X_DeliveryTypes { get; set; }
        public DbSet<Demand> Demands { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<FavouriteList> FavouriteLists { get; set; }
        public DbSet<UserRating> UserRatings { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        public DbSet<RoleType> RoleTypes { get; set; }
        public DbSet<User_x_RoleType> Users_X_RoleTypes { get; set; }
        public DbSet<Message> Messages{get;set;}
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DeliveryType>()
                .HasMany(adt => adt.Ad_X_DeliveryType)
                .WithOne(dt => dt.DeliveryType)
                .HasForeignKey(adt => adt.DeliveryTypeId);


            builder.Entity<Ad>()
                .HasMany(adt => adt.Ad_x_DeliveryType)
                .WithOne(a => a.Ad)
                .HasForeignKey(adt => adt.AdId);

            builder.Entity<Ad>()
                .HasMany(adt => adt.Photos)
                .WithOne(a => a.Ad)
                .HasForeignKey(adt => adt.AdId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Ad>()
            .HasMany<Demand>(c => c.Demands)
            .WithOne(ad => ad.Ad)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>()
            .HasMany<Demand>(c => c.Demands)
            .WithOne(ad => ad.User)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Fundraiser>()
                .HasMany(adt => adt.Donations)
                .WithOne(a => a.Fundraiser)
                .HasForeignKey(adt => adt.FundraiserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UserRating>()
                .HasOne(user => user.Receiver)
                .WithMany(l => l.RatingReceived)
                .HasForeignKey(user => user.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UserRating>()
                .HasOne(user => user.Sender)
                .WithMany(l => l.RatingGiven)
                .HasForeignKey(user => user.SenderId)
                .OnDelete(DeleteBehavior.Restrict);


            builder.Entity<User>()
                .HasMany(urt => urt.Users_x_RoleTypes)
                .WithOne(u => u.User)
                .HasForeignKey(urt => urt.UserId)
                .IsRequired();
            builder.Entity<RoleType>()
                .HasMany(urt => urt.Users_x_RoleTypes)
                .WithOne(rt => rt.RoleType)
                .HasForeignKey(urt => urt.RoleTypeId)
                .IsRequired();
            
            builder.Entity<Message>()
                .HasOne(user => user.Receiver)
                .WithMany(message => message.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Message>()
                .HasOne(user => user.Sender)
                .WithMany(message => message.MessagesGiven)
                .OnDelete(DeleteBehavior.Restrict);
        }







    }
}