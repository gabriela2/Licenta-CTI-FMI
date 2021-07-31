using System;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class Donation
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public double Amount { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Fundraiser Fundraiser { get; set; }
        public int FundraiserId { get; set; }
    }
}