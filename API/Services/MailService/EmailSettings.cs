using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.MailService
{
    public class EmailSettings
    {
        public String PrimaryDomain { get; set; }

        public int PrimaryPort { get; set; }

        public String SecondayDomain { get; set; }

        public int SecondaryPort { get; set; }

        public String UsernameEmail { get; set; }

        public String UsernamePassword { get; set; }

        public String FromEmail { get; set; }

        public String FromName { get; set; }

        public string ToEmail { get; set; }

        public string CcEmail { get; set; }
    }
}