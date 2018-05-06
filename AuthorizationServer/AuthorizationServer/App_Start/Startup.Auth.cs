using AuthorizationServer.Authorization.OAuth2Client;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Infrastructure;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace AuthorizationServer
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.SetDefaultSignInAsAuthenticationType(DefaultAuthenticationTypes.ApplicationCookie);
            // Enable Application Sign In Cookie
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                AuthenticationMode = AuthenticationMode.Passive,
                ExpireTimeSpan = TimeSpan.FromDays(1),
                LoginPath = new PathString("/Account/Login")
            });
            // Setup Authorization Server
            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            {
                AuthorizeEndpointPath = new PathString("/OAuth2/Authorize"),
                ApplicationCanDisplayErrors = true,
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                AllowInsecureHttp = true, //if DEBUG
                // Authorization server provider which controls the lifecycle of Authorization Server
                Provider = new OAuthAuthorizationServerProvider
                {
                    OnValidateClientRedirectUri = ValidateClientRedirectUri
                }    
            });
        }
        private Task  ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            List<OAuth2Client> clients = OAuth2ClientConfig.GetInstance().GetOAuthClients();
            OAuth2Client client = clients.Find(f => f.ID == context.ClientId);
            context.Validated(client.RedirectUrls.FirstOrDefault(f=>f == context.RedirectUri));
            return Task.FromResult(0);
        }
    }
}