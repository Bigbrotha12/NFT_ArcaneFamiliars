import React from "react";
import Title from './Title';
import Status from './Status';
import ThemeToggler from "./ThemeToggler";
import Login from './Login';

export default function Header() {

  return (
    <div className="bg-[#0A0022] flex flex-row h-14 sticky top-0 z-10 shadow-[0_8px_6px_-6px_rgba(0,0,0,0.8)]">
        <Title />
        <ThemeToggler />
        <Status />
        <Login />
    </div>
  )
}
