import React from 'react';
import styles from '../styles/Header.module.css';

import Title from './Title.jsx';
import Status from './Status.jsx';
import Login from './Login.jsx';

export default function Header() {
  return (
    <div className={styles.header}>
      <Title />
      <Status />
      <Login />
    </div>
  )
}
