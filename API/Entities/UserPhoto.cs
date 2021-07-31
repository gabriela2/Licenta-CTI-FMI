using System.ComponentModel.DataAnnotations.Schema;

namespace HelpAFamilyOfferAChance.API.Entities
{
    [Table("UserPhotos")]
    public class UserPhoto
    {
        public int Id { get; set; }
        public string Url{get;set;}
        public string PublicId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}