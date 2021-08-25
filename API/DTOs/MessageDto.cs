using System;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string SenderLastName { get; set; }
        public string SenderFirstName { get; set; }
        public string ReceiverLastName { get; set; }
        public string ReceiverFirstName { get; set; }

    }
}