using System.Threading.Tasks;
using API.Services.MailService.Template;

namespace API.Services.MailService
{
    public interface IEmailService
    {
        Task SendConfirmationEmailAsync(string to, string subject, ConfirmationEmailTemplate emailTemplate);
        Task SendTokenEmailAsync(string to, string subject, TokenEmailTemplate emailTemplate);
        Task SendEmailAsync(string to, string subject, string mailTemplate);
        
    }
}