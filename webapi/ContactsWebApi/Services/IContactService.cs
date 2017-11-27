using System.Collections.Generic;
using ContactsWebApi.Models;

namespace ContactsWebApi.Services
{
    public interface IContactService
    {
        List<Contact> FindContacts();
        Contact FindContactById(int id);

        Contact AddNewContact(Contact contact);
        Contact UpdateContact(Contact contact);
        Contact DeleteContact(int id);
    }
}
