import React from "react";
import { Outlet } from "react-router-dom";

export default function Body() {
  return (
    <div className="bg-[#D9D9D9] relative justify-center h-full min-h-screen w-4/5">
        <Outlet />
    </div>
  )
}