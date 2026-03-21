import { useEffect } from "react";

const CleverAds = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.id = "CleverCoreLoader100674";
    script.src = "https://scripts.cleverwebserver.com/bb8bbc863573a5296f490916b1afeca1.js";
    script.async = true;
    script.type = "text/javascript";

    script.setAttribute("data-target", window.name || "");
    script.setAttribute("data-callback", "yourCallbackFunction");
    script.setAttribute("data-callback-url-click", "yourClickMacro");
    script.setAttribute("data-callback-url-view", "yourViewMacro");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // cleanup
    };
  }, []);

  return <div id="ad-container"></div>;
};

export default CleverAds;