using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url{get;set;}
        public string PublicId { get; set; }
        public bool IsMain{get;set;}
        public Ad Ad { get; set; }
        public int? AdId { get; set; }
        public Fundraiser Fundraiser{get;set;}
        public int? FundraiserId{get;set;}
        // public User User{get;set;}
        // public int? UserId{get;set;}
        
    }
}