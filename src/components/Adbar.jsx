import { useEffect } from "react";

const CleverAds = () => {
  useEffect(() => {
    if (document.getElementById("CleverCoreLoader100674")) return;

    const script = document.createElement("script");
    script.id = "CleverCoreLoader100674";
    script.async = true;
    script.type = "text/javascript";
    script.setAttribute("data-cfasync", "false");

    script.innerHTML = `
      (function (document, window) {
        var a, c = document.createElement("script"), f = window.frameElement;

        c.id = "CleverCoreLoader100674-inner";
        c.src = "https://scripts.cleverwebserver.com/bb8bbc863573a5296f490916b1afeca1.js";
        c.async = true;
        c.type = "text/javascript";

        c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));

        try {
          a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
        } catch (e) {
          a = false;
        }

        a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
        a.parentNode.insertBefore(c, a);
      })(document, window);
    `;

    document.body.appendChild(script);
  }, []);

  return <div style={{ minHeight: "250px" }}></div>;
};

export default CleverAds;