import React from "react";
import Config from "../../../app/constants/AppConfig.json";
import { Authentication } from "../../../app/Definitions";
import { ControllerContext, UserContext } from "../../../state/Context";
import { Unity, useUnityContext } from "react-unity-webgl";

import Material from "../../../assets/Material";

export default function UnityCanvas() {
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
      <div className="bg-black m-auto w-full h-full flex align-middle justify-center">
        {!gameLaunch && <Material.Button sx={{position: "absolute", top: "40%", height: "auto", margin: "auto"}} variant="contained" onClick={() => setGameLaunch(true)} startIcon={<Material.PlayArrow/>}>Launch Game</Material.Button>}
        {gameLaunch && loadingProgression != 1 && <Material.CircularProgress sx={{position: "absolute", top: "40%", margin: "auto"}} variant="determinate" value={loadingProgression * 100} />}
        {gameLaunch && <Unity className="w-[900px] h-[500px]" unityProvider={unityProvider} />}
        {gameLaunch && <Material.Button sx={{position: "absolute", height: "auto", margin: "auto", marginTop: "-40px"}} variant="contained" onClick={handleClose} startIcon={<Material.Close/>}>Close Game</Material.Button>}  
      </div>
  );
}
