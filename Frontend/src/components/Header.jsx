import React from 'react';
import styles from '../styles/lightStyles.module.css';

import Title from './headerItems/Title.jsx';
import Nav from './headerItems/Nav.jsx';
import Login from './headerItems/Login.jsx';

export default function Header(props) {
  return (
    <div className={styles.header}>
      <Title />
      <Nav />
      <Login address={props.address}/>
    </div>
  )
}
