using System.Collections.Generic;

namespace API.Entities
{
    public class UnitOfMeasure
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation{get;set;}
        public string Description { get; set; }
        public ICollection<Ad> Ads { get; set; }

    }
}