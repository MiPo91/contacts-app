using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsWebApi.Models
{
    public class Authentication
    {
        public string Account { get; set; }
        public string Password { get; set; }

        public Authentication() { }

        public Authentication(string account, string password)
        {
            Account = account;
            Password = password;
        }
    }
}
