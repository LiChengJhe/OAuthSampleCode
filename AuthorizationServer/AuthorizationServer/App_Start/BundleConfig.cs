using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace AuthorizationServer.App_Start
{
    public class BundleConfig
    {
        // 如需「搭配」的詳細資訊，請瀏覽 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js/jquery").Include(
                  "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/js/jquery/validate").Include(
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/js/bootstrap").Include(
                      "~/Scripts/umd/popper.min.js",
                      "~/Scripts/bootstrap.js"
                      ));

            bundles.Add(new StyleBundle("~/css/bootstrap").Include(
                "~/Content/font-awesome.css",
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.css"));

            bundles.Add(new ScriptBundle("~/js/entropizer").Include(
              "~/Scripts/entropizer.js",
               "~/Scripts/jquery-entropizer.js"));

            bundles.Add(new StyleBundle("~/css/entropizer").Include(
                "~/Content/jquery-entropizer.css"));
        }
    }
}