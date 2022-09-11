import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { SidebarContext } from "../components/SidebarContext";
import { Button } from "@mui/material";
import style from "../styles/lightStyles.module.css";

export default function UnityFrame() {
  const showSidebar = React.useContext(SidebarContext);
  
  const { unityProvider, sendMessage, addEventListener, removeEventListener, unload } =
    useUnityContext({
      loaderUrl: "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.loader.js",
      dataUrl: "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.data",
      frameworkUrl: "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.framework.js",
      codeUrl: "https://my-unity-game.s3.amazonaws.com/AnimalFeeder.wasm",
    });

  const handleGameOver = React.useCallback((userName, score) => {
    setIsGameOver(true);
    setUserName(userName);
    setScore(score);
  }, []);

  const handleClose = async () => {
    await unload();
    showSidebar(true);
  }

  React.useEffect(() => {
    showSidebar(false);
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
      // let script = window.document.querySelector(
      //   'script[src="https://my-unity-game.s3.amazonaws.com/AnimalFeeder.framework.js"]');
      // if(script !== null) window.document.body.removeChild(script);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);
  
  return (
      <div className={style.unityContainer} >
        <div className={style.unityCanvas} >
          <Unity style={{height: 450, width: 800}} unityProvider={unityProvider} />
        </div> 
        <div className={style.unityButton}>
          <Button variant="contained" onClick={handleClose}>Close Game</Button>
        </div>
      </div>
  );
}
