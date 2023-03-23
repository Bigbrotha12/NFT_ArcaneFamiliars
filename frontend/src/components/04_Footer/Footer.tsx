import React from "react";
import Material from "../../assets/Material";
import Blockdata from "./Blockdata";
import Copyright from "./Copyright";
import Version from "./Version";

export default function Footer() {
  
  return (
    <div className="bg-[#242424] flex px-[6rem] py-[6rem]">
      <div className="text-white">
        <Material.Typography variant='h4'>Follow Us!</Material.Typography>
        <Material.Typography>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Material.Typography>
      </div>

      <div className="text-white">
        <Material.Typography color='inherit'>Privacy Policy</Material.Typography>
        <Material.Typography color='inherit'>Terms and Conditions</Material.Typography>
        <Material.Typography color='inherit'>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Material.Typography>
      </div>

      <div className="text-white">
        <Material.Typography variant='h4' color='inherit'>Contact</Material.Typography>
        <Material.Typography color='inherit'>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Material.Typography>
      </div>
      {/* <Blockdata />
      <Copyright />
      <Version /> */}
    </div>
      
  )
}
