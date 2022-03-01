using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;
using System;
using System.Threading.Tasks;

namespace Binary.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest("Missing Data");
                }
                var msg =await _accountService.Register(model);

                return Ok(msg);
            }
            catch (Exception ex)
            {

                return BadRequest("An Error Occured");
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Register loginRequest)
        {
            try
            {
                if (loginRequest == null || string.IsNullOrEmpty(loginRequest.UserName) || string.IsNullOrEmpty(loginRequest.Password))
                {
                    return BadRequest("Missing login details");
                }
                var loginResponse =await _accountService.Login(loginRequest);

                if (loginResponse == false)
                {
                    return BadRequest($"Invalid credentials");
                }
                return Ok(loginResponse);
            }
            catch (Exception ex)
            {
                return BadRequest("An Error Occured");
            }

        }


    }
}
