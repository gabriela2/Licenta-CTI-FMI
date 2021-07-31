namespace API.Entities
{
    public class Ad_x_DeliveryType
    {
        public int Id { get; set; }
        public DeliveryType DeliveryType { get; set; }
        public int DeliveryTypeId { get; set; }
        public Ad Ad { get; set; }
        public int AdId { get; set; }
        
    }
}