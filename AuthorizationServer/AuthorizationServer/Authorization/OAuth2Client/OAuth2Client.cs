using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace AuthorizationServer.Authorization.OAuth2Client
{
    public class OAuth2Client
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public List<string> RedirectUrls { get; set; }
    }

    public class OAuth2ClientConfig
    {
        private static readonly object Lock = new object();
        private static OAuth2ClientConfig _Instance;
        private List<XElement> _XElements;
  

        private OAuth2ClientConfig()
        {
            XDocument xml = XDocument.Load(HttpContext.Current.Server.MapPath(@"~/") + @"Authorization/OAuth2Client/OAuth2ClientConfig.xml");
            _XElements = xml.Root.Elements("Client").ToList();
        }
        public static OAuth2ClientConfig GetInstance()
        {
            if (null == _Instance)
            {
                lock (Lock)
                {
                    if (null == _Instance) _Instance = new OAuth2ClientConfig();          
                }
            }
            return _Instance;
        }
        public List<OAuth2Client> GetOAuthClients()
        {
            List<OAuth2Client> clients = new List<OAuth2Client>();
            foreach (XElement e in _XElements)
            {
                OAuth2Client client = new OAuth2Client
                {
                    ID = e.Element("ID").Value.Trim(),
                    Name = e.Element("Name").Value.Trim(),
                    RedirectUrls = e.Elements("RedirectUrl").Select(s=>s.Value.Trim()).ToList<string>()
                };
                clients.Add(client);
            }
            return clients;
        }
    }
}