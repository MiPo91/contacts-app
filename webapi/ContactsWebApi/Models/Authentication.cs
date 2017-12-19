using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsWebApi.Models
{
    public class Authentication
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public Authentication() { }

        public Authentication(string account, string password)
        {
            Username = account;
            Password = password;
        }
    }
}
