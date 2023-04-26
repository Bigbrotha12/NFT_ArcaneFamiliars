import React from "react";

import LandingHeader from "../01_Header/LandingHeader";
import Sidebar from "../02_Sidebar/Sidebar";
import Body from "../03_Body/Body";

// Handles layout
export default function Layout() {
  const navItems: Array<{ title: string, link: string }> = [
        { title: "Home", link: "/app" },
        { title: "Docs", link: "/app" },
        { title: "Support", link: "/app" },
        { title: "Play Now", link: "/app" }
    ]

  return (
    <div className="h-full">
      <LandingHeader items={navItems}/>
      <div className="flex flex-row h-full">
        <div className="hidden md:block">
          {/* <Sidebar /> */}
        </div>
        
        <Body />
      </div>
    </div>
    
  ) 
}

