using System.Collections.Generic;
using System.Linq;
using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public class ContactRepository: IContactRepository
    {
        private List<Contact> _contacts;

        public ContactRepository()
        {
            _contacts = new List<Contact>();
            Initialize();
        }

        public List<Contact> GetAll()
        {
            return _contacts;
        }

        public Contact GetById(int id)
        {
            return _contacts.FirstOrDefault(c => c.Id == id);
        }

        private void Initialize()
        {
            _contacts = new List<Contact>
            {
                new Contact(1, "Joku", "Jostain", "040123456", "Jokutie 12", "Lappeenranta"),
                new Contact(2, "Nukku", "Matti", "0401234567", "Nukkujantie 17", "Lappeenranta")
            };
        }
    }
}
