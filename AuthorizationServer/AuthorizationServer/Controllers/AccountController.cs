using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace AuthorizationServer.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Login()
        {
            var authentication = HttpContext.GetOwinContext().Authentication;
            if (Request.HttpMethod == "POST")
            {
                string account = Request.Form["account"];
                string password = Request.Form["password"];
                if (!string.IsNullOrEmpty(account) && !string.IsNullOrEmpty(password))
                {
                    authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                    authentication.SignIn(
                      new AuthenticationProperties { IsPersistent = true },
                      new ClaimsIdentity(new[] {
                            new Claim(ClaimsIdentity.DefaultNameClaimType,  account)
                      }, DefaultAuthenticationTypes.ApplicationCookie));
                } else ViewBag.Error = "The account and password cannot be null";
            }
            return View();
        }
    }
}