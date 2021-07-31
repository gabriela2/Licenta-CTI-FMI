using System;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class Demand
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int QuantityRequested { get; set; }
        public bool IsApproved { get; set; }
        public string DeliveryTypeSelected { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Ad Ad { get; set; }
        public int AdId { get; set; }

    }
}