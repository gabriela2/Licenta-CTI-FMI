using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using System.Transactions;
using API.Entities;
using API.Helpers;
using API.Repositories.UserRepository;
using HelpAFamilyOfferAChance.API.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
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


        [HttpGet("GetBalance")]

        public async Task<IActionResult> GetBalance()
        {
            var service = new BalanceService();
            Balance balance = await service.GetAsync();
            return new OkObjectResult(new { success = "true", bal = balance.Object });
        }

        [HttpGet("GetPayments")]
        public async Task<IActionResult> GetPayments()
        {
            var options = new ChargeListOptions
            {
                Limit = 1000
            };
            var service = new ChargeService();
            StripeList<Charge> charges = await service.ListAsync(options);
            return new OkObjectResult(new { success = "true", payments = charges });
        }


        [HttpPost("CreateCharges")]
        public async Task<IActionResult> CreateCharges([FromBody] CreateChargeModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customers = new CustomerService();
            var customer = customers.Create(
                new CustomerCreateOptions{
                    Email = model.Email,
                    Source = model.TokenId,
                }
            );

            var options = new ChargeCreateOptions{
                Amount = (int)(model.Amount * 100),
                Currency = "usd",
                Description = "Test Charge",
                Customer = customer.Id,
                ReceiptEmail = model.Email
            };
            var service = new ChargeService();
            await service.CreateAsync(options);
            return new OkObjectResult(new { Success = "true", message = "Payment Received." });
        }


        [HttpPost("RefundPayment")]
        public async Task<ActionResult> RefundPayment([FromBody] string chargeId) 
        {
            var refunds = new RefundService();
            var refundOptions = new RefundCreateOptions
            {
                Charge = chargeId
            };
            var refund = await refunds.CreateAsync(refundOptions);
            return new OkObjectResult(new { Success = "true" });
        }


        [HttpPost("CreateConnectedExpressAccount/{id}")]
        public IActionResult CreateConnectedExpressAccount(int id)
        {

            var options = new AccountCreateOptions
            {
                Type = "express",
            };

            var service = new AccountService();
            var account = service.Create(options);

            var linkOptions = new AccountLinkCreateOptions
            {
                Account = account.Id,
                RefreshUrl = "https://example.com/reauth",
                ReturnUrl = "https://example.com/return",
                Type = "account_onboarding",
            };
            var linkService = new AccountLinkService();
            var accountLink = linkService.Create(linkOptions);

            User user = _userRepository.GetUserByIdAsync(id).Result;
            user.StripeAccount = account.Id;
            user.StripeConfigurationLink = accountLink.Url;
            _userRepository.Update(user);

            return new OkObjectResult(new { id = account.Id, link = accountLink.ToJson() });
        }


        [HttpPost("TransferPayment")]
        public Object TransferPayment([FromBody] TransferModel model)
        {
            
            var options = new TransferCreateOptions
            {
                Amount = (int)(model.Amount * 100),
                Currency = "ron",
                Destination = model.ConnectedStripeAccountId
            };

            var service = new TransferService();
            var Transfer = service.Create(options);
            return Transfer.StripeResponse;
        }
    }
}