using System;

namespace API.DTOs
{
    public class DemandDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } 
        public int QuantityRequested { get; set; }
        public bool IsApproved { get; set; }
        public string DeliveryTypeSelected { get; set; }
        public int UserId { get; set; }
        public int AdId { get; set; }
    }
}