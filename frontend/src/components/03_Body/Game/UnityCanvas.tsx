import React from "react";
import Config from "../../../app/constants/AppConfig";
import { Authentication } from "../../../app/Definitions";
import { Unity, useUnityContext } from "react-unity-webgl";

import Material from "../../../assets/Material";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Context";
import { useIMX } from "../../../app/IMXHooks";

export default function UnityCanvas() {

  const userAddress: string = useSelector<RootState, string>(state => state.session.address);
  const [client, auth, loading, error] = useIMX();

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
    if(!userAddress) {
      await client.connect();
    }
    await client.authenticate();
  
    if(auth) {
      sendMessage("APIHandler", "ReceiveAuthentication", JSON.stringify(auth));
    } 
  }, [userAddress, auth]);

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
