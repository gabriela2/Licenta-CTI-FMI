using System.Collections.Generic;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class Address
    {
         public int Id { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public User Users { get; set; }
        public int UserId{get;set;}
    }
}