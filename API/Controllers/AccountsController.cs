using API.Data;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccountsController : ApiController
    {
        [Route("register")]
        [HttpPost]
        public IHttpActionResult Register(Register register)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var context = new DataContext())
            {
                var email = context.Register.Where(x => x.Email == register.Email).FirstOrDefault();
                if (email == null)
                {
                    context.Register.Add(new Register()
                    {
                        Name = register.Name,
                        Email = register.Email,
                        Password = register.Password
                    });
                    context.SaveChanges();
                    return Ok("Registered Successfully");
                }
                else
                {
                    return BadRequest("Email exists");
                }

            }

        }

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login(Login login)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var context = new DataContext())
            {
                var email = context.Register.Where(x => x.Email == login.Email).FirstOrDefault();
                var password = context.Register.Where(x => x.Password == login.Password).FirstOrDefault();

                if (email != null && password != null)
                {
                    var result = context.Register.Where(x => x.Email == login.Email && x.Password == login.Password).FirstOrDefault();
                    if (result != null)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
            }
            return Unauthorized();
        }
    }
}
