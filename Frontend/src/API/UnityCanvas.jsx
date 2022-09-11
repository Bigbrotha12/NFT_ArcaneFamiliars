import React from 'react';

export default function createUnity() {
  const unityCanvas = () => {<canvas style={{"width":"960", "height":"600"}}/>}
  React.useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.loader.js";
    document.body.appendChild(script);

    script.onload = () => {
      createUnityInstance(document.getElementById('Unity'), unityConfig, (progress) => {
      }).catch((message) => { alert(message); });
    };

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <canvas id='Unity' style={{"width":"960", "height":"600"}} />
  );
}

const unityConfig = {
  dataUrl: "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.data",
  frameworkUrl: "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.framework.js",
  codeUrl: "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.wasm",
  streamingAssetsUrl: "https://my-unity-game.s3.amazonaws.com/StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Prototype2",
  productVersion: "0.1",
  showBanner: unityShowBanner,   
}

const unityShowBanner = (msg, type) => {
  console.log(type);
  console.log(msg);
}