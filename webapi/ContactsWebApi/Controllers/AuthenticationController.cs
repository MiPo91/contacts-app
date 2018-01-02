using ContactsWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ContactsWebApi.Models;
using System.Threading.Tasks;

namespace ContactsWebApi.Controllers
{
    [Route("api/authentication")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost]
        public async Task<IActionResult> GetToken([FromBody] Authentication authentication)
        {

            var token = await _authenticationService.RequestAccessToken(authentication);
            if(token == null)
            {
                Response.StatusCode = 401;
            }
            return new JsonResult(token);
        }
    }
}
