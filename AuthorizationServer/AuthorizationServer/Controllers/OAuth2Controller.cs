using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace AuthorizationServer.Controllers
{
    public class OAuth2Controller : Controller
    {

        public ActionResult Authorize()
        {
            if (Response.StatusCode != 200) return View("Authorize Error !");
            
            var authentication = HttpContext.GetOwinContext().Authentication;
            var ticket = authentication.AuthenticateAsync(DefaultAuthenticationTypes.ApplicationCookie).Result;
            var identity = ticket != null ? ticket.Identity : null;
            if (identity == null)
            {
                authentication.Challenge(DefaultAuthenticationTypes.ApplicationCookie);
                return new HttpUnauthorizedResult();
            }
            var scopes = (Request.QueryString.Get("scope") ?? "");
            if (Request.HttpMethod == "POST")
            {
                if (!string.IsNullOrEmpty(Request.Form.Get("submit.grant")))
                {
                    identity = new ClaimsIdentity(identity.Claims, "Bearer", identity.NameClaimType, identity.RoleClaimType);
                    identity.AddClaim(new Claim("OAuth2.Scopes", scopes));          
                    authentication.SignIn(identity);
                }
                if (!string.IsNullOrEmpty(Request.Form.Get("submit.login")))
                {
                    authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                    authentication.Challenge(DefaultAuthenticationTypes.ApplicationCookie);
                    return new HttpUnauthorizedResult();
                }
            }
            return View();
        }
    }
}