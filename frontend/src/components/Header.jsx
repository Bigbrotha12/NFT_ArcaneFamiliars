import React from 'react';
import styles from '../styles/lightStyles.module.css';

import Title from './headerItems/Title.jsx';
import Status from './headerItems/Status.jsx';
import Login from './headerItems/Login.jsx';

export default function Header() {
  return (
    <div className={styles.header}>
      <Title />
      <Status />
      <Login />
    </div>
  )
}
