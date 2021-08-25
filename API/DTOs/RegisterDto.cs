using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(int.MaxValue, MinimumLength = 8)]
        [RegularExpression("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$", ErrorMessage = " Parola trebuie sa aiba minimum 8 caractere, dintre care cifre, minuscule, majuscule si caractere speciale (ex. !@#$%^&*)")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsOrganisation { get; set; }
        public string OrganizationIdentificationNumber{get;set;}
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }


    }
}