namespace API.DTOs
{
    public class ChangePasswordDto
    {
        public string Token{get;set;}
        public string NewPassword { get; set; }
        
    }
}