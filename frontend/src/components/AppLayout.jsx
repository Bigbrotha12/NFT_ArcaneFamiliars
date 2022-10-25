//import style from '../styles/Global.module.css';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Body from "./Body/Body";

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

