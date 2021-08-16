using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.MessageRepository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AdMessage(Message message)
        {
            _context.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.Where(message => message.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MessageDto>> GetMessagesBetweenCurrentUserAndReceiver(int currentUserLogged, int participantUserId)
        {
            var messages = await _context.Messages.Where(message => message.ReceiverId == currentUserLogged && message.SenderId == participantUserId ||
            message.ReceiverId == participantUserId && message.SenderId == currentUserLogged).OrderBy(message => message.CreatedAt).ToListAsync();

            var unreadMessages = messages.Where(message => message.ReadAt==null && message.ReceiverId ==currentUserLogged).ToList();
            if(unreadMessages.Any()){
                foreach(var message in unreadMessages){
                    message.ReadAt = DateTime.Now;
                }
                await _context.SaveChangesAsync();
            }
            return _mapper.Map<IEnumerable<MessageDto>>(messages);
            
        }

        public async Task<PagedList<MessageDto>> GetMessagesByUserId(MessageParams messageParams)
        {
            var query = _context.Messages.OrderByDescending(message => message.CreatedAt).AsQueryable();

            query = messageParams.Type switch
            {
                "Received" => query.Where(user => user.ReceiverId == messageParams.UserId),
                "Unread" => query.Where(user => user.ReceiverId == messageParams.UserId && user.ReadAt == null),
                _ => query.Where(user => user.SenderId == messageParams.UserId)

            };
            return await PagedList<MessageDto>.CreateAsync(query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider), messageParams.PageNumber, messageParams.PageSize);

        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}