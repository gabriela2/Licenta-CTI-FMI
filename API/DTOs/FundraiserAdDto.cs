using System;

namespace API.DTOs
{
    public class FundraiserAdDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public double CurrentAmount { get; set; }
        public double TargetAmount { get; set; }
        public bool IsValidated { get; set; }
        public bool IsRejected { get; set; }
        public int UserId{get;set;}
    }
}