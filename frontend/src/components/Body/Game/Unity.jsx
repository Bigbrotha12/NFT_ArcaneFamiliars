import { Unity, useUnityContext } from "react-unity-webgl";
import { AppConfig } from "../../../constants/AppConfig";
import { Button, CircularProgress } from "@mui/material";
import { PlayArrow, Close } from "@mui/icons-material";
import style from "../../../styles/Body.module.css";

export default function UnityFrame() {
  const [gameLaunch, setGameLaunch] = React.useState(false);
  const { unityProvider, sendMessage, addEventListener, removeEventListener, unload, loadingProgression } =
    useUnityContext({
      loaderUrl: AppConfig.GameFiles.loader,
      dataUrl: AppConfig.GameFiles.data,
      frameworkUrl: AppConfig.GameFiles.framework,
      codeUrl: AppConfig.GameFiles.code,
    });

  const handleClose = async () => {
    await unload();
    setGameLaunch(false);
    setSiteState(state => ({...state, showSideBar: true}));
  }

  const handleLaunch = () => {
    setSiteState(state => ({...state, showSideBar: false}));
    setGameLaunch(true);
  }

  React.useEffect(() => {
    //addEventListener("GameOver", handleGameOver);
    return () => {
      //removeEventListener("GameOver", handleGameOver);
    };
  }, [/*addEventListener, removeEventListener, handleGameOver*/]);
  
  return (
      <div className={style.unityContainer} >
        <div className={style.unityCanvas} >
          {!gameLaunch && <Button variant="contained" onClick={handleLaunch} startIcon={<PlayArrow/>}>Launch Game</Button>}  
          {gameLaunch && loadingProgression != 1 && <CircularProgress sx={{position: "absolute", margin: "auto"}} />}
          {gameLaunch && <Unity className={style.unity} unityProvider={unityProvider} />}
        </div> 
        <div className={style.unityButton}>
          {gameLaunch && <Button variant="contained" onClick={handleClose} startIcon={<Close/>}>Close Game</Button>}
        </div>
      </div>
  );
}
