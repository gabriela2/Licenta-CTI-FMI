using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Repositories.MessageRepository;
using API.Repositories.UserRepository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public MessagesController(IMessageRepository messageRepository, IMapper mapper, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _messageRepository = messageRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> AddMessage(MessageDto messageDto)
        {
            if (messageDto.SenderId == messageDto.ReceiverId)
            {
                return BadRequest("Mesajul trebuie sa aiba un destinatar diferit de expeditor");
            }
            var sender = await _userRepository.GetMemberAsync(messageDto.SenderId);
            var receiver = await _userRepository.GetMemberAsync(messageDto.ReceiverId);
            Message model = new Message()
            {
                Text = messageDto.Text,
                SenderId = messageDto.SenderId,
                ReceiverId = messageDto.ReceiverId,
            };
            _messageRepository.AdMessage(model);
            if (await _messageRepository.SaveAllAsync())
            {
                MessageDto modelDto = new MessageDto()
                {
                    Id = model.Id,
                    Text = model.Text,
                    CreatedAt = model.CreatedAt,
                    ReadAt = model.ReadAt,
                    SenderId = model.SenderId,
                    ReceiverId = model.ReceiverId,
                    SenderLastName = sender.LastName,
                    SenderFirstName = sender.FirstName,
                    ReceiverLastName = receiver.LastName,
                    ReceiverFirstName = receiver.FirstName
                };
                return Ok(modelDto);
            }
            return BadRequest("Mesajul nu a putut fi adaugat");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesByUserId(int id, [FromQuery] MessageParams messageParams)
        {
            messageParams.UserId = id;
            var messages = await _messageRepository.GetMessagesByUserId(messageParams);
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
            return messages;
        }
        [HttpGet("chat/{currentUserId}/{participantUserId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesBetweenCurrentUserAndReceiver(int currentUserId, int participantUserId)
        {
            var messages = await _messageRepository.GetMessagesBetweenCurrentUserAndReceiver(currentUserId, participantUserId);
            return Ok(messages);
        }
    }
}