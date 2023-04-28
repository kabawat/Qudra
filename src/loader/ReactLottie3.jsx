import React from "react";
import lottie from "lottie-web";
import loading from "./loading3.json";

export default function ReactLotti3() {
  React.useEffect( () => {
    lottie.loadAnimation( {
      container: document.querySelector( "#loading2" ),
      animationData: loading,
    } );
  }, [] );

  return <div id="loading2" style={ { width: 69, height: 28 } } />;
}
