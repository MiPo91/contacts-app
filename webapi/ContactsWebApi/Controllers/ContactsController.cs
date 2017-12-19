using ContactsWebApi.Models;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContactsWebApi.Controllers
{
    [Authorize]
    [Route("api/contacts")]
    public class ContactsController: Controller
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _contactService.FindContacts();
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _contactService.FindContactById(id);
            return new JsonResult(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact contact)
        {
            var result = _contactService.AddNewContact(contact);
            return new JsonResult(result);
        }

        
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contact contact)
        {
            var result = _contactService.UpdateContact(contact);
            return new JsonResult(result);
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var result = _contactService.DeleteContact(id);
            return new JsonResult(result);
        }

    }
}
