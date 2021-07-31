using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class FavouriteList
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Ad Ad { get; set; }
        public int? AdId { get; set; }
        public Fundraiser Fundraiser { get; set; }
        public int? FundraiserId{get;set;}
    }
}