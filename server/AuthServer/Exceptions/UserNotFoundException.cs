using System;

namespace AuthSever.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException() { }

        public UserNotFoundException(string message) : base(String.Format(message)) { }
    }
}
