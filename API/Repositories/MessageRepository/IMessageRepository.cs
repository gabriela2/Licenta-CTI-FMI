using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Repositories.MessageRepository
{
    public interface IMessageRepository
    {
        void AdMessage(Message message);
        void DeleteMessage(Message message);
        Task<bool> SaveAllAsync();
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesByUserId(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessagesBetweenCurrentUserAndReceiver(int currentUserLogged, int participantUserId );
        
    }
}