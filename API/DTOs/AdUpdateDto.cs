using System.Collections.Generic;

namespace API.DTOs
{
    public class AdUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Quantity { get; set; }
        public bool ExistsLimit { get; set; }
        public bool IsActive{get;set;}
        public double? Limit { get; set; }
        public string UnitOfMeasure { get; set; }
        public int UnitOfMeasureId { get; set; }
        public string Category { get; set; }
        public int CategoryId { get; set; }
    
    
    
    }
}