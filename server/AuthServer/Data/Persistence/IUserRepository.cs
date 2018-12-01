using AuthSever.Data.Models;

namespace AuthSever.Data.Persistence
{
    public interface IUserRepository
    {
        User Register(User user);

        User Login(string userId, string password);

        User FindUserById(string userId);
    }
}
