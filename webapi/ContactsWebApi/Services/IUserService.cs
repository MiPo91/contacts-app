using ContactsWebApi.Models;

namespace ContactsWebApi.Services
{
    public interface IUserService
    {
        User FindUserByAccount(string account);
    }
}
