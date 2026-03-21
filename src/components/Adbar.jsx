import { useEffect } from "react";

const CleverAds = () => {
  useEffect(() => {
    if (document.getElementById("clever-core")) return;

    const script = document.createElement("script");
    script.id = "clever-core";
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    script.innerHTML = `
      (function (document, window) {
        var a, c = document.createElement("script"), f = window.frameElement;

        c.id = "CleverCoreLoader100674";
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

    // 🔥 Force sticky after ad loads
    setTimeout(() => {
      const iframe = document.querySelector('iframe[id^="clever"]');
      if (iframe) {
        iframe.style.position = "fixed";
        iframe.style.bottom = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "90px";
        iframe.style.zIndex = "999999";
        iframe.style.border = "none";
      }
    }, 2500);

  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100px",
      }}
    />
  );
};

export default CleverAds;