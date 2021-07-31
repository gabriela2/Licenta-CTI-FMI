using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using API.Services.MailService.Template;
using Microsoft.Extensions.Options;

namespace API.Services.MailService
{
    public class EmailService : IEmailService
    {
        public EmailSettings _emailSettings { get; }
        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(string to, string subject, string mailTemplate)
        {
            string toEmail = to;
            MailMessage mail = new MailMessage()
            {
                From = new MailAddress(_emailSettings.FromEmail, _emailSettings.FromName)
            };
            mail.To.Add(new MailAddress(toEmail));

            mail.Body = mailTemplate;
            mail.Subject = subject;
            mail.IsBodyHtml = true;
            using (SmtpClient smtp = new SmtpClient(_emailSettings.PrimaryDomain, _emailSettings.PrimaryPort))
            {
                smtp.EnableSsl = true;
                smtp.Credentials = new NetworkCredential(_emailSettings.UsernameEmail, _emailSettings.UsernamePassword);
                await smtp.SendMailAsync(mail);
            }
        }

        public async Task SendConfirmationEmailAsync(string to, string subject, ConfirmationEmailTemplate mailTemplate)
        {
            // code to send email
            // gmail smtp
            string toEmail = to;
            MailMessage mail = new MailMessage()
            {
                From = new MailAddress(_emailSettings.FromEmail, _emailSettings.FromName)
            };
            mail.To.Add(new MailAddress(toEmail));
          
            var pathToFile = Path.Combine(Directory.GetCurrentDirectory(), "Services", "MailService", "Template", "ConfirmationEmailTemplate.html");
            mail.Body = BuildTemplate(File.ReadAllText(pathToFile), mailTemplate);


            mail.Subject = subject;
            mail.IsBodyHtml = true;           

            using (SmtpClient smtp = new SmtpClient(_emailSettings.PrimaryDomain, _emailSettings.PrimaryPort))
            {

                smtp.Credentials = new NetworkCredential(_emailSettings.UsernameEmail, _emailSettings.UsernamePassword);
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(mail);
            }
        }

        public async Task SendTokenEmailAsync(string to, string subject, TokenEmailTemplate mailTemplate)
        {
            // code to send email
            // gmail smtp
            string toEmail = to;
            MailMessage mail = new MailMessage()
            {
                From = new MailAddress(_emailSettings.FromEmail, _emailSettings.FromName)
            };
            mail.To.Add(new MailAddress(toEmail));
          
            var pathToFile = Path.Combine(Directory.GetCurrentDirectory(), "Services", "MailService", "Template", "TokenEmailTemplate.html");
            mail.Body = BuildTemplate(File.ReadAllText(pathToFile), mailTemplate);


            mail.Subject = subject;
            mail.IsBodyHtml = true;           

            using (SmtpClient smtp = new SmtpClient(_emailSettings.PrimaryDomain, _emailSettings.PrimaryPort))
            {

                smtp.Credentials = new NetworkCredential(_emailSettings.UsernameEmail, _emailSettings.UsernamePassword);
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(mail);
            }
        }

        private static string BuildTemplate(string template, object obj)
        {
            var templateValues = Regex.Matches(template, @"{([^}]*)}").Cast<Match>()
                .Select(m => m.Groups[1].Value).Distinct().ToList();

            var members = obj.GetType().GetProperties();

            var validMembers = members
                 .Where(m => templateValues.Contains(m.Name))
                 .Select(m => new KeyValuePair<string, string>(m.Name, m.GetValue(obj)?.ToString()))
                 .ToList();

            foreach (var member in validMembers)
                template = template.Replace(String.Format("{{{0}}}", member.Key), member.Value);

            return template;
        }
    }
}