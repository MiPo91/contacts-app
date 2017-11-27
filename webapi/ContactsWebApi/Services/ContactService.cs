using System.Collections.Generic;
using ContactsWebApi.Models;
using ContactsWebApi.Repositories;

namespace ContactsWebApi.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public List<Contact> FindContacts()
        {
            return _contactRepository.GetAll();
        }

        public Contact FindContactById(int id)
        {
            return _contactRepository.GetById(id);
        }

        public Contact AddNewContact(Contact contact)
        {
            return _contactRepository.AddContact(contact);
        }

        public Contact UpdateContact(Contact contact)
        {
            return _contactRepository.UpdateContact(contact);
        }

        public Contact DeleteContact(int id)
        {
            return _contactRepository.DeleteContact(id);
        }
    }
}
