import React from 'react';
import styles from '../styles/lightStyles.module.css';
import { Outlet } from "react-router-dom";

export default function Body() {
  return (
    <div className={styles.body}>
        <Outlet />
    </div>
  )
}
