using System;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.DTOs
{
    public class DonationDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int FundraiserId { get; set; }
    }
}