import { Unity, useUnityContext } from "react-unity-webgl";
import { AppConfig } from "../../../constants/AppConfig";
import { Button, CircularProgress } from "@mui/material";
import { PlayArrow, Close } from "@mui/icons-material";
import style from "../../../styles/Body.module.css";
import { UserContext } from "../../../constants/AppContext";
import { IMXLink } from "../../../API/IMXLink";

export default function UnityFrame() {
  const [userInfo, ] = React.useContext(UserContext);
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
  };

  const handleLaunch = () => {
    setSiteState(state => ({...state, showSideBar: false}));
    setGameLaunch(true);
  };

  const requestAuthentication = React.useCallback(async () => {
    let auth = await IMXLink.requestAuthentication();
    let payload = {
      eth_address: userInfo.address,
      eth_timestamp: auth.timestamp,
      eth_signature: auth.result
    }
    sendMessage("SessionManager", "SetUserAuth", JSON.stringify(payload));
  });

  React.useEffect(() => {
    addEventListener("requestAuth", requestAuthentication);
    return () => {
      removeEventListener("requestAuth", requestAuthentication);
    };
  }, [addEventListener, removeEventListener, requestAuthentication]);
  
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
