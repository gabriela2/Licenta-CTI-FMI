namespace API.DTOs
{
    public class MemberUpdateProfileDto
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsOrganisation { get; set; }
        public string OrganizationIdentificationNumber{get;set;}
        
    }
}