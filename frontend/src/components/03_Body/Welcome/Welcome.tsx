import React from "react";
import Backdrop from "../../../assets/images/pexels-butterflies-by-pixabay.jpeg";

export default function Welcome() {
    return (
        <div className="bg-cover bg-center bg-fixed bg-no-repeat">
            <img className="h-screen w-full -z-10" src={Backdrop} alt="butterflies" />
        </div>
    )
}