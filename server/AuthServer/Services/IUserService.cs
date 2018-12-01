using AuthSever.Data.Models;

namespace AuthSever.Services
{
    public interface IUserService
    {
        bool IsUserExists(string UserId);

        User Login(string UserId, string Password);

        User Register(User UserDetails);
    }
}
