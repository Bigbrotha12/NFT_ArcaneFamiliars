import React from 'react';
import styles from '../styles/lightStyles.module.css';
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Body from "./Body.jsx";
import { SidebarContext } from './SidebarContext';


export default function AppLayout() {
  const [userAddress, setUserAddress] = React.useState("");
  const [showSidebar, setShowSidebar] = React.useState(true);

  return (
    <>
      <section className={styles.headerSection}> 
        <Header address={[userAddress, setUserAddress]} />        
      </section>
      
      <section className={styles.mainSection} >
        {showSidebar && <Sidebar />}
        <SidebarContext.Provider value={setShowSidebar} >
          <Body />
        </SidebarContext.Provider>
      </section>

      <section className={styles.footerSection}>
        <Footer />
      </section>
    </>
  )
}

