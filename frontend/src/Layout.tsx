//import style from '../styles/Global.module.css';
import Footer from "./components/04_Footer/Footer";
import React from "react";
import Header from "./components/01_Header/Header";
import Sidebar from "./components/02_Sidebar/Sidebar";
import Body from "./components/03_Body/Body";


export default function AppLayout() {
  const sidebarState = React.useState(true);

  return (
    <>
      <section /*className={style.headerSection}*/> 
        <Header />        
      </section>
      
      <section /*className={style.mainSection}*/ >
        {sidebarState[0] && <Sidebar />}     
          <Body setShowSidebar={sidebarState[1]}/>
      </section>

      <section /*className={style.footerSection}*/>
        <Footer />
      </section>
    </>
  )
}

