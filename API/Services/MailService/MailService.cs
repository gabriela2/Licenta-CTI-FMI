using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using API.Services.MailService.Templates;
using Microsoft.Extensions.Options;

namespace API.Services.MailService
{
    public class MailService : IMailService
    {
        public EmailSettings _emailSettings { get; }

        public MailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }
        public async Task SendEmailConfirmationAsync(string receiverEmail, string subject, EmailConfirmationTemplate detailsIncludedInMail)
        {
            MailMessage mail = new MailMessage()
            {
                From = new MailAddress(_emailSettings.Email, _emailSettings.Name),
            };
            mail.To.Add(new MailAddress(receiverEmail));
            mail.Body = ReplaceProp(detailsIncludedInMail);
            mail.IsBodyHtml = true;
            mail.Subject = subject;           

            using (SmtpClient smtp = new SmtpClient(_emailSettings.Host, _emailSettings.Port))
            {
                smtp.Credentials = new NetworkCredential(_emailSettings.Email, _emailSettings.Password);
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(mail);
            }
        }

        private static string ReplaceProp(EmailConfirmationTemplate detailsIncludedInMail)
        {
            var templatePath = "C:\\Users\\Gabi\\Documents\\licenta FMI\\cod-proiect\\HelpAFamilyOfferAChance\\api\\Services\\MailService\\Templates\\EmailConfirmationTemplate.html";
            var template = File.ReadAllText(templatePath);
            template = template.Replace("{username}",detailsIncludedInMail.username);
            template = template.Replace("{url}", detailsIncludedInMail.url);
            return template;
        }
    }
}