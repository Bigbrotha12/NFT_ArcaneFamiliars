import React from "react";
import { Outlet } from "react-router-dom";

export default function Body() {
  return (
    <div className="bg-[#D9D9D9] relative -z-10 flex flex-row justify-center items-center w-4/5">
        <Outlet />
    </div>
  )
}