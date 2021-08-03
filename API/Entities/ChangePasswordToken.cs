using System;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class ChangePasswordToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime CreatedAt{get;set;}
        public bool Used { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        
    }
}