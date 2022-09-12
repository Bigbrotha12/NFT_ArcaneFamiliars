import React from 'react';
import styles from '../styles/lightStyles.module.css';
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Body from "./Body.jsx";

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = React.useState(true);

  return (
    <>
      <section className={styles.headerSection}> 
        <Header />        
      </section>
      
      <section className={styles.mainSection} >
        {showSidebar && <Sidebar />}     
          <Body setShowSidebar={setShowSidebar}/>
      </section>

      <section className={styles.footerSection}>
        <Footer />
      </section>
    </>
  )
}

