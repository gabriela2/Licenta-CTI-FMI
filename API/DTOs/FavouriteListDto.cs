namespace API.DTOs
{
    public class FavouriteListDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? AdId { get; set; }
        public int? FundraiserId { get; set; }

    }
}