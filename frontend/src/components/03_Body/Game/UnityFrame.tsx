import React from "react";
import Config from "../../../app/constants/AppConfig.json";
import { Authentication } from "../../../app/Definitions";
import { ControllerContext, UserContext } from "../../../state/Context";
import { Unity, useUnityContext } from "react-unity-webgl";

import Material from "../../../assets/Material";
import Frame from "../../../assets/images/fantasy-border.png";

export default function UnityFrame() {
  const [userInfo, setUserInfo] = React.useContext(UserContext);
  const controller = React.useContext(ControllerContext);
  const [gameLaunch, setGameLaunch] = React.useState(false);
  const { unityProvider, sendMessage, addEventListener, removeEventListener, unload, loadingProgression } =
    useUnityContext({
      loaderUrl: Config.Unity.loader,
      dataUrl: Config.Unity.data,
      frameworkUrl: Config.Unity.framework,
      codeUrl: Config.Unity.code,
    });

  const handleClose = async () => {
    await unload();
    setGameLaunch(false);
  };

  const requestAuthentication = React.useCallback(async () => {  
    if(!userInfo.address) {
      const address = await controller.connectIMX();
      await setUserInfo(user => {return {...user, address: address}});
    }

    const auth: Authentication | null = await controller.getAuthentication(userInfo.address);
    if(auth) {
      await sendMessage("APIHandler", "ReceiveAuthentication", JSON.stringify(auth));
    } 
    
  }, [userInfo.address]);

  React.useEffect(() => {
    addEventListener("RequestAuth", requestAuthentication);
    return () => {
      removeEventListener("RequestAuth", requestAuthentication);
    };
  }, [addEventListener, removeEventListener, requestAuthentication]);
  
  return (
      <div className="flex flex-column h-screen align-middle justify-center">
        <img src={Frame} className="top-0 left-0 h-full w-full absolute" />
          
        <div className="bg-black m-auto w-[600px] h-[400px] flex align-middle justify-center z-10">
          {!gameLaunch && <Material.Button sx={{position: "relative", height: "auto", margin: "auto"}} variant="contained" onClick={() => setGameLaunch(true)} startIcon={<Material.PlayArrow/>}>Launch Game</Material.Button>}
          {gameLaunch && <Material.Button sx={{position: "absolute", top: "10%", right: "0%", height: "auto", margin: "auto"}} variant="contained" onClick={handleClose} startIcon={<Material.Close/>}>Close Game</Material.Button>}  
          {gameLaunch && loadingProgression != 1 && <Material.CircularProgress sx={{position: "absolute", top: "50%", left: "50%", margin: "auto"}} variant="determinate" value={loadingProgression * 100} />}
          {gameLaunch && <Unity className="w-[600px] h-[400px]" unityProvider={unityProvider} />}
        </div>
        
      </div>
  );
}
