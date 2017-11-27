using System.Collections.Generic;
using System.Linq;
using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public class ContactRepository: IContactRepository
    {
        private List<Contact> _contacts;
        private ContactContext _dbContext;

        public ContactRepository(ContactContext context)
        {
             _contacts = new List<Contact>();
            _dbContext = context;
           // InitializeDB();
        }

        public List<Contact> GetAll()
        {
            _contacts = _dbContext.Contacts.ToList();
            return _contacts;
        }

        public Contact GetById(int id)
        {
            var contact = _dbContext.Contacts.FirstOrDefault(c => c.Id == id);
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
            var updatedContact = _dbContext.Contacts.Where(c => c.Id == contact.Id).FirstOrDefault();

            if(updatedContact == null)
            {
                return null;
            }

            updatedContact.FirstName = contact.FirstName;
            updatedContact.LastName = contact.LastName;
            updatedContact.Phone = contact.Phone;
            updatedContact.StreetAddress = contact.StreetAddress;
            updatedContact.City = contact.City;

            _dbContext.Contacts.Update(updatedContact);
            _dbContext.SaveChanges();

            return updatedContact;
        }

        public Contact DeleteContact(int id)
        {
            var contact = _dbContext.Contacts.Where(c => c.Id == id).FirstOrDefault();

            if (contact == null)
            {
                return null;
            }

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
