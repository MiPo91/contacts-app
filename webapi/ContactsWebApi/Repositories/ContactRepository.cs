using System.Collections.Generic;
using System.Linq;
using ContactsWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsWebApi.Repositories
{
    public class ContactRepository: IContactRepository
    {
        private ContactContext _dbContext;

        public ContactRepository(ContactContext context)
        {
            _dbContext = context;
           // InitializeDB();
        }

        public List<Contact> GetAll()
        {
            return _dbContext.Contacts.AsNoTracking().ToList();
        }

        public Contact GetById(int id)
        {
            var contact = _dbContext.Contacts.AsNoTracking().FirstOrDefault(c => c.Id == id);
            return contact;
        }

        public Contact AddContact(Contact contact)
        {
            var newContact = new Contact
            {
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Phone = contact.Phone,
                StreetAddress = contact.StreetAddress,
                City = contact.City
            };

            _dbContext.Contacts.Add(newContact);
            _dbContext.SaveChanges();
            
            return newContact;
        }

        public Contact UpdateContact(Contact contact)
        {
            _dbContext.Contacts.Update(contact);
            _dbContext.SaveChanges();

            return contact;
        }

        public Contact DeleteContact(Contact contact)
        {
            _dbContext.Contacts.Remove(contact);
            _dbContext.SaveChanges();
            return contact; 
        }

        private void InitializeDB()
        {
            if (_dbContext.Contacts.Any())
            {
                return;   // DB has been seeded
            }

            var contacts = new Contact[]
            {
              //  new Contact(firstName='Matti',lastName='Meikalainen',phone='040123456',streetAddress='jokukuja 55',city='Lappeenranta')
            };

            foreach (Contact contact in contacts)
            {
                _dbContext.Contacts.Add(contact);
            }
            _dbContext.SaveChanges();
        }
    }
}
