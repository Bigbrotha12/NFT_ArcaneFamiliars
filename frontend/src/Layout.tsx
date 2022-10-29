import React from "react";
//import { Outlet } from "react-router-dom";
import Header from "./components/01_Header/Header";
import Sidebar from "./components/02_Sidebar/Sidebar";
import Footer from "./components/04_Footer/Footer";
import Router from "./Router";

// Handles layout
export default function Layout() {
  
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-row justify-end h-full w-full">
        <Sidebar />
        <Router />
      </div>
      <Footer />
    </div>
    
  ) 
}

