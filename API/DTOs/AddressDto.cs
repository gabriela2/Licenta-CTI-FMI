namespace API.DTOs
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public int UserId { get; set; }
    }
}