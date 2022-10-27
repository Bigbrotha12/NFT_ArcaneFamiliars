//import styles from '../../styles/Body.module.css';
import { Outlet } from "react-router-dom";

export default function Body(props) {
  return (
    <div /*className={styles.body}*/>
        <Outlet />
    </div>
  )
}
