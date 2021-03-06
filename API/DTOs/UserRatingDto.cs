using System;

namespace API.DTOs
{
    public class UserRatingDto
    {
        public int Id { get; set; }
        public float Rating { get; set; }
        public string Title{get;set;}
        public DateTime CreatedAt{get;set;} 
        public string Comment { get; set; }
        public int ReceiverId { get; set; }
        public int SenderId{get;set;}
        public bool IsValidated { get; set; }
        public bool IsRejected { get; set; }
    }
}