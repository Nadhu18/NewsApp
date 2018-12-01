using AuthSever.Data.Models;
using AuthSever.Exceptions;
using AuthSever.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AuthSever.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly IUserService _service;
        private readonly ITokenGenerator _tokenGenerator;

        public AuthController(IUserService service, ITokenGenerator tokenGenerator)
        {
            _service = service;
            _tokenGenerator = tokenGenerator;
        }

        //this method will be called by the client app with the user object to register the user
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody]User user)
        {
            try
            {
                if (_service.IsUserExists(user.UserId))
                {
                    return StatusCode(409, "User already exists with this ID");
                }
                else
                {
                    _service.Register(user);
                    return Ok(user);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Some error occured in the server");
            }
        }

        //this menthod is called with user to authenticate and generate a JWT token
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody]User user)
        {
            try
            {
                string userId = user.UserId;
                string password = user.Password;

                User _user = _service.Login(userId, password);

                string value = _tokenGenerator.GetJWTToken(user.UserId);
                return Ok(value);
            }
            catch (UserNotFoundException unf)
            {
                return NotFound(unf.Message);
            }
            catch
            {
                return StatusCode(500, "Some error occurred");
            }
        }

    }
}