using ContactsWebApi.Models;
using System.Linq;

namespace ContactsWebApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private ContactContext _dbContext;

        public UserRepository(ContactContext context)
        {
            _dbContext = context;
            InitializeDB();
        }

        public User GetByAccount(string account)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Account == account);
        }

        private void InitializeDB()
        {
            if (_dbContext.Users.Any())
            {
                return;   // DB has been seeded
            }
            var newUser = new User
            {
                Account = "test",
                Password = "test",
                Name = "Tester"
            };

            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
        }

    }
}
