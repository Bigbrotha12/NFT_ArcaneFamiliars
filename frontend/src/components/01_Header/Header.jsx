//import styles from '../../styles/Header.module.css';
import Title from './Title';
import Status from './Status';
import Login from './Login';

export default function Header() {
  return (
    <div /*className={styles.header}*/>
      <Title />
      <Status />
      <Login />
    </div>
  )
}
