import React from "react";
import Blockdata from "./Blockdata";
import Copyright from "./Copyright";
import Version from "./Version";

export default function Footer() {
  
  return (
    <div className="sticky bottom-0 bg-[#D9D9D9] flex flex-row justify-between py-2 shadow-inner">
      <Blockdata />
      <Copyright />
      <Version />
    </div>
      
  )
}
