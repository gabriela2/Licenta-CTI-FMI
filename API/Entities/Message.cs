using System;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }= DateTime.Now;
        public DateTime? ReadAt { get; set; }
        public bool DeletedBySender { get; set; }
        public bool DeletedByReceiver { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string SenderLastName { get; set; }
        public string SenderFirstName { get; set; }
        public string ReceiverLastName { get; set; }
        public string ReceiverFirstName { get; set; }
        public User Sender { get; set; }
        public User Receiver { get; set; }
    }
}