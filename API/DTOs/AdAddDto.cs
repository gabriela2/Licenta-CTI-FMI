using System;

namespace API.DTOs
{
    public class AdAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Quantity { get; set; }
        public bool ExistsLimit { get; set; }
        public double? Limit { get; set; }
        public int UnitOfMeasureId { get; set; }
        public int CategoryId { get; set; }
        public int UserId{get;set;}
        public DateTime CreatedAt { get; set; }
    }
}