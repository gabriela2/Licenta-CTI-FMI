namespace API.DTOs
{
    public class MemberUpdateBankDetailsDto
    {
        public int Id { get; set; }
         public string Iban{get;set;}
        public string Bank{get;set;}
        public string Owner{get;set;}
    }
}