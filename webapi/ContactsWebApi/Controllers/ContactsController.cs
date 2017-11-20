using ContactsWebApi.Models;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsWebApi.Controllers
{
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
            var contacts = _contactService.FindContacts();
            return new JsonResult(contacts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var contact = _contactService.FindContactById(id);
            return new JsonResult(contact);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact contact)
        {
            var contacts = _contactService.AddNewContact(contact);
            return new JsonResult(contacts);
        }

        
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contact contact)
        {
            var contacts = _contactService.UpdateContact(contact);
            return new JsonResult(contacts);
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var contacts = _contactService.DeleteContact(id);
            return new JsonResult(contacts);
        }

    }
}
