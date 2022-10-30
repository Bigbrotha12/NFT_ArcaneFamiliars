import React from "react";
import Header from "./components/01_Header/Header";
import Sidebar from "./components/02_Sidebar/Sidebar";
import Body from "./components/03_Body/Body";
import Footer from "./components/04_Footer/Footer";

// Handles layout
export default function Layout() {
  
  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-row justify-end h-full w-full overflow-auto">
        <Sidebar />
        <Body />
      </div>
      <Footer />
    </div>
    
  ) 
}

