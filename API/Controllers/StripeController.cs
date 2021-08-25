using System;
using System.Threading.Tasks;
using API.Helpers;
using API.Repositories.UserRepository;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;

namespace Help.Controllers
{
    
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly StripeKeys _stripeKeys;
        public StripeController(IOptions<StripeKeys> stripeKeys, IUserRepository userRepository)
        {
            _stripeKeys = stripeKeys.Value;
            _userRepository = userRepository;
            StripeConfiguration.ApiKey = _stripeKeys.SecretKey;
        }


        [HttpPost("charge")]
        public async Task<ActionResult> AddCharges([FromBody] API.Helpers.Charge model)
        {
            var curstomerCreateOption = new CustomerCreateOptions
            {
                Source = model.Token,
            };
            var customersService = new CustomerService();
            var customer = customersService.Create(curstomerCreateOption);


            var chargeCreateOptions = new ChargeCreateOptions
            {
                Amount = (int)(model.Amount * 100),
                Currency = "ron",
                Description = model.Description,
                Customer = customer.Id,
            };
            var chargeService = new ChargeService();
            await chargeService.CreateAsync(chargeCreateOptions);
            return NoContent();
        }



        [HttpPost("express-account/{id}")]
        public async Task<ActionResult> CreateConnectedExpressAccount(int id)
        {

            var accountCreateOptions = new AccountCreateOptions
            {
                Type = "express",
            };

            var accountService = new AccountService();
            var account = accountService.Create(accountCreateOptions);

            var accountLinkCreateOptions = new AccountLinkCreateOptions
            {
                Account = account.Id,
                RefreshUrl = "https://example.com/reauth",
                ReturnUrl = "https://example.com/return",
                Type = "account_onboarding",
            };
            var accountLinkService = new AccountLinkService();
            var accountLink = accountLinkService.Create(accountLinkCreateOptions);

            User user = _userRepository.GetUserByIdAsync(id).Result;
            user.StripeAccount = account.Id;
            user.StripeConfigurationLink = accountLink.Url;
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync()) return Ok(new { id = account.Id, link = accountLink });
            return BadRequest("Userul nu a putut fi actualizat");
        }


        [HttpPost("transfer")]
        public async Task<ActionResult> Transfer([FromBody] API.Helpers.Transfer transfer)
        {

            var transferCreateOptions = new TransferCreateOptions
            {
                Amount = (int)(transfer.Amount * 100),
                Currency = "ron",
                Destination = transfer.StripeAccount
            };

            var transferService = new TransferService();
            await transferService.CreateAsync(transferCreateOptions);
            return NoContent();
        }
    }
}