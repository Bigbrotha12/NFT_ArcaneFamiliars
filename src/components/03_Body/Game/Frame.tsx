import React from "react";
//import Decoration from "../../../assets/images/fantasy-border.png";
import UnityCanvas from "./UnityCanvas";
//import Controller from "./Controller";

export default function Frame(){
    return (
        <div className="h-full w-full flex align-middle pt-16">
            {/* * Background image must occupy 100% of body and appear behind other components
            <img src={Decoration} className="top-0 left-0 h-full w-full absolute" /> */}

            {/* Controller and canvas need to be center and occupy 80% of body*/}
            <div className=" w-[640px] h-[480px] m-auto flex flex-col align-middle justify-center">
                {/* <Controller /> */}
                <UnityCanvas />
            </div>
        </div>
    );
}