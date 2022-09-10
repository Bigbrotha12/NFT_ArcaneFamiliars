import React from 'react';
import styles from '../styles/appStyles.module.css';
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Body from "./Body.jsx";


export default function AppLayout() {
  const [userAddress, setUserAddress] = React.useState("");

  

  return (
    <>
      <section className={styles.headerSection}> 
        <Header address={[userAddress, setUserAddress]} />        
      </section>
      
      <section className={styles.mainSection} >
        <Sidebar />
        <Body />
      </section>

      <section className={styles.footerSection}>
        <Footer />
      </section>
      
    </>
  )
}
