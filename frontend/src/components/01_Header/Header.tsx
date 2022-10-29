import React from "react";
import Title from './Title';
import Status from './Status';
import ThemeToggler from "./ThemeToggler";
import Login from './Login';

export default function Header() {
  return (
    <div className="bg-[#0B022D] flex flex-row h-14 sticky top-0 shadow-[0_3px_5px_1px_rgba(137,137,137,0.8)]">
      <Title />
      <ThemeToggler />
      <Status />
      <Login />
    </div>
  )
}
