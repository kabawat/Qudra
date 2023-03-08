import React from "react";
import lottie from "lottie-web";
import loading from "./loading.json";

export default function ReactLotti() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loading"),
      animationData: loading,
    });
  }, []);

  return <div id="loading" style={{ width: 69, height: 40 }} />;
}
