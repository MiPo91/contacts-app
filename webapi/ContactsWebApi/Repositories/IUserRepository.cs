using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public interface IUserRepository
    {
        User GetByAccount(string account);
    }
}
