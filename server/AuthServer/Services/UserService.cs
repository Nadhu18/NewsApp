using AuthSever.Data.Models;
using AuthSever.Data.Persistence;
using AuthSever.Exceptions;

namespace AuthSever.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        //returns true if user exists in db
        public bool IsUserExists(string UserId)
        {
            var user = _repo.FindUserById(UserId);
            if (user != null)
            {
                return true;
            }
            return false;
        }

        //will return the user if the login details are valid
        public User Login(string UserId, string Password)
        {
            var user = _repo.Login(UserId, Password);
            if (user != null)
            {
                return user;
            }
            else
            {
                throw new UserNotFoundException("Invalid userId or password");
            }
        }

        //to register the user
        public User Register(User UserDetails)
        {
            var user = _repo.Register(UserDetails);
            return user;
        }
    }
}
