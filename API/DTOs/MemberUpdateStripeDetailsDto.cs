namespace API.DTOs
{
    public class MemberUpdateStripeDetailsDto
    {
        public int Id { get; set; }
        public string StripeAccount { get; set; }
        public string StripeConfigurationLink { get; set; }
    }
}