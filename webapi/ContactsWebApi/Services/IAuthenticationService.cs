using ContactsWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsWebApi.Services
{
    public interface IAuthenticationService
    {
        Task<AccessToken> RequestAccessToken(Authentication authentication);
    }
}
