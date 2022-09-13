import styles from '../styles/Global.module.css';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Body from "./Body/Body";

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

