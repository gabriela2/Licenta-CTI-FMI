using System;

namespace API.Services.MailService
{
    public class EmailSettings
    {
        public String Host { get; set; }
        public int Port { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public String Name { get; set; }
    }
}