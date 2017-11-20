using System.Collections.Generic;
using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public interface IContactRepository
    {
        List<Contact> GetAll();
        Contact GetById(int id);

        //  TODO add, update, delete
        List<Contact> AddContact(Contact contact);
        List<Contact> UpdateContact(Contact contact);
        List<Contact> DeleteContact(int id);
    }
}
