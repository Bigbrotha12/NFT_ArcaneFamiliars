import React from "react";
import { Outlet } from "react-router-dom";

export default function Body() {
  return (
    <div className="flex bg-[#242424] relative justify-center h-full min-h-screen w-4/5">
        <Outlet />
    </div>
  )
}