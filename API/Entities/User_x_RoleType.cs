using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class User_x_RoleType
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoleTypeId { get; set; }
        public User User { get; set; }
        public RoleType RoleType { get; set; }
    }
}