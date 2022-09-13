import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { AppConfig } from "../../../constants/AppConfig";
import { SidebarContext } from "../../../constants/AppContext";
import { Button, CircularProgress } from "@mui/material";
import style from "../../styles/Body.module.css";

export default function UnityFrame() {
  const showSidebar = React.useContext(SidebarContext);
  const { unityProvider, sendMessage, addEventListener, removeEventListener, unload } =
    useUnityContext({
      loaderUrl: AppConfig.GameFiles.loader,
      dataUrl: AppConfig.GameFiles.data,
      frameworkUrl: AppConfig.GameFiles.framework,
      codeUrl: AppConfig.GameFiles.code,
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
    };
  }, [addEventListener, removeEventListener, handleGameOver]);
  
  return (
      <div className={style.unityContainer} >
        <div className={style.unityCanvas} >
          <CircularProgress value={50} />
          <Unity className={style.unity} unityProvider={unityProvider} />
        </div> 
        <div className={style.unityButton}>
          <Button variant="contained" onClick={handleClose}>Close Game</Button>
        </div>
      </div>
  );
}
