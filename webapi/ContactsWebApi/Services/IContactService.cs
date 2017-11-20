using System.Collections.Generic;
using ContactsWebApi.Models;

namespace ContactsWebApi.Services
{
    public interface IContactService
    {
        List<Contact> FindContacts();
        Contact FindContactById(int id);

        List<Contact> AddNewContact(Contact contact);
        List<Contact> UpdateContact(Contact contact);
        List<Contact> DeleteContact(int id);
    }
}
