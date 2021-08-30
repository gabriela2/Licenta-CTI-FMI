namespace API.Helpers
{
    public class Transfer
    {
        public string StripeAccount { get; set; }
        public double Amount { get; set; }
        public string Description{get;set;}
    }
}