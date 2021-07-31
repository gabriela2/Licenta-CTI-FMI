using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class UserRating
    {
        public int Id { get; set; }
        public float Rating { get; set; }
        public string Comment { get; set; }
        public int ReceiverId { get; set; }
        public int SenderId{get;set;}
        public User Sender { get; set; }
        public User Receiver { get; set; }
    }
}