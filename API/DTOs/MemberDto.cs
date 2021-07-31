using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
        
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime LastActivity { get; set; } 
        public string StripeAccount { get; set; }
        public string StripeConfigurationLink { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool IsOrganisation { get; set; }
        public string OrganizationIdentificationNumber{get;set;}
        public UserPhotoDto Photo{get;set;}
        public string PhotoUrl { get; set; }

    }
}