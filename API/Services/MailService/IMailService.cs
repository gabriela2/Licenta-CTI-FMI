using System.Threading.Tasks;
using API.Services.MailService.Templates;

namespace API.Services.MailService
{
    public interface IMailService
    {
        Task SendEmailConfirmationAsync(string to, string subject,EmailConfirmationTemplate emailConfirmationTemplate);

    }
}