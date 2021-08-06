using System;
using System.Collections.Generic;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class Fundraiser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public double CurrentAmount { get; set; }
        public double TargetAmount { get; set; }
        public bool IsValidated { get; set; }
        public bool IsRejected { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Donation> Donations { get; set; }
        public ICollection<FavouriteList> FavouriteList { get; set; }


    }
}