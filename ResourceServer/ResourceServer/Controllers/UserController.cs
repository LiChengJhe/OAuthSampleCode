using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ResourceServer.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        [Route("GetUserName"), HttpPost, Authorize]
        public string GetUserName()
        {
            return this.User.Identity.Name;
        }

    }
}