import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityFrame() {
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [userName, setUserName] = React.useState();
  const [score, setScore] = React.useState();
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

  React.useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
      unload();
    };
  }, [addEventListener, removeEventListener, handleGameOver]);
  
  function handleClickSpawnEnemies() {
    sendMessage("GameController", "SpawnEnemies", 100);
  }

  return (
    <Fragment>
      <Unity style={{"height": "100%", "width": "100%"}} unityProvider={unityProvider} />
      {isGameOver === true && (
        <p>{`Game Over ${userName}! You've scored ${score} points.`}</p>
      )}
    </Fragment>
  );
}
