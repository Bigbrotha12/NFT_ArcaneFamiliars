import React from 'react';
import styles from '../styles/Footer.module.css';
import FooterNav from "./FooterNav.jsx";

export default function Footer() {
  const footerContent = [
    {
      label: "My Company",
      data: "Our company specializes in the creation of websites and NFT games."
    },
    {
      label: "About Us",
      data: "I am a solo developer working to bring Web3 projects to life."
    },
    {
      label: "Contact Us",
      data: "You can reach me by post mail at 1101 Washington Street, Pensacola, Florida."
    }
  ];
  
  return (
    <div >
        <FooterNav />
    </div>
  )
}
