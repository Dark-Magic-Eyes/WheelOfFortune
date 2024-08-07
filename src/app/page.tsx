'use client'
import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Home() {
  const { unityProvider, sendMessage, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "Build/LuckyWheel.loader.js",
    dataUrl: "Build/LuckyWheel.data",
    frameworkUrl: "Build/LuckyWheel.framework.js",
    codeUrl: "Build/LuckyWheel.wasm",
    streamingAssetsUrl: "StreamingAssets",
  });
  useEffect(()=>{
    window.addEventListener("message", (event)=>{
      handleClickLoadButton();
    })
  }, [])
  const handleClickLoadButton = () => {
    sendMessage("AssetManager", "LoadDataPreview", "https://66b18a7b1ca8ad33d4f45f7d.mockapi.io/game/api/WheelOfFortune/1");
  };
  return (
    <main className="flex min-h-screen justify-center items-center gap-10">
      <div className="flex mx-auto items-center justify-center w-[100vw] h-[100vh] drop-shadow-glow">
        {!isLoaded && <p className="absolute z-[-1]">Loading Application... {Math.round(loadingProgression * 100)}%</p>}
        <Unity
          unityProvider={unityProvider}
          style={{ aspectRatio: 0.4613733906, maxWidth: 430, width: "inherit"}}
        />
      </div>
      {/* <div>
        <button onClick={handleClickLoadButton}>Change Asset</button>
      </div> */}
    </main>
  );
}
