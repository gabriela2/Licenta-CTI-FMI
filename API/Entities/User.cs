using System;
using System.Collections.Generic;
using API.Entities;

namespace HelpAFamilyOfferAChance.API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime LastActivity { get; set; } = DateTime.Now;
        public string StripeAccount { get; set; }
        public string StripeConfigurationLink { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool IsOrganisation { get; set; }
        public string OrganizationIdentificationNumber { get; set; }
        public string Iban{get;set;}
        public string Bank{get;set;}
        public string Owner{get;set;}
        public bool StripeLinkWasAccessed{get;set;}
        public Address Address { get; set; }
        public ICollection<Ad> Ads { get; set; }
        public ICollection<Fundraiser> Fundraisers { get; set; }
        public ICollection<Demand> Demands { get; set; }
        public ICollection<Donation> Donations { get; set; }
        public ICollection<UserRating> RatingReceived { get; set; }
        public ICollection<UserRating> RatingGiven { get; set; }
        public ICollection<FavouriteList> FavouriteList { get; set; }
        public ICollection<Photo> Photos{get;set;}



    }
}