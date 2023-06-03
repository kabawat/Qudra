import lottie from "lottie-web";
import loading from "./loading3.json";
import React from "react";
export default function ReactLottie4() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loading3"),
      animationData: loading,
    });
  }, []);

  return (
    <div id="loading3" style={{ width: 120, height: 28, margin: "auto" }} />
  );
}
