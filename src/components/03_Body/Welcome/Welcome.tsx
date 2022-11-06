import React from "react";

const backdrop = "http://my-unity-game.s3-website-us-east-1.amazonaws.com/assets/pexels-butterflies-by-pixabay.jpeg";

export default function Welcome() {
    return (
        <div className="bg-cover bg-center bg-fixed bg-no-repeat">
            <img className="h-screen w-full -z-10" src={backdrop} alt="butterflies" />
        </div>
    )
}