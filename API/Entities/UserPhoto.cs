using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class UserPhoto
    {
        
        public int Id { get; set; }
        public string Url{get;set;}
        public string PublicId { get; set; }
        public User User{get;set;}
        public int UserId{get;set;}
    }
}