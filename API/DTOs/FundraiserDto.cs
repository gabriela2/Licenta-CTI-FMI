using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class FundraiserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public double CurrentAmount { get; set; }
        public double TargetAmount { get; set; }
        public bool IsValidated { get; set; }
        public int UserId{get;set;}
        public string Url { get; set; }
        public ICollection<PhotoDto> Photos {get;set;}
        public ICollection<DonationDto> Donations { get; set; }
    }
}