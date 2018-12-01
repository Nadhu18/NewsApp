
namespace AuthSever.Services
{
    public interface ITokenGenerator
    {
        string GetJWTToken(string userId);
    }
}

