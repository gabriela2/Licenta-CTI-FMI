namespace API.Helpers
{
    public class DemandsParams
    {
        private const int MaxPageSize = 10;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize{ 
            get=>_pageSize;
            set=> _pageSize=(value>MaxPageSize)?MaxPageSize:value;
        }
        public string OrderBy { get; set; } = "createdAt";
        public string SortBy {get;set;}="isDeclined";
        public string DeliveryTypeSelected { get; set; }
    }
}