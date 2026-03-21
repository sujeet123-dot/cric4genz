import { useEffect } from "react";

const CleverAds = () => {
  useEffect(() => {
    if (document.getElementById("CleverCoreLoader100674")) return;

    const script = document.createElement("script");
    script.id = "CleverCoreLoader100674";
    script.src = "https://scripts.cleverwebserver.com/bb8bbc863573a5296f490916b1afeca1.js";
    script.async = true;
    script.type = "text/javascript";
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="clever-ad-container"
      style={{
        width: "100%",
        minHeight: "250px",   // ✅ FIXED
        margin: "20px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        position: "relative",
        zIndex: 9999,
        background: "#fff"
      }}
    />
  );
};

export default CleverAds;