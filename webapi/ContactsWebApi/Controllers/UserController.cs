using ContactsWebApi.Models;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsWebApi.Controllers
{
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{account}")]
        public IActionResult GetByAccount(string account)
        {
            var result =_userService.FindUserByAccount(account);
            return new JsonResult(result);
        }
    }
}
