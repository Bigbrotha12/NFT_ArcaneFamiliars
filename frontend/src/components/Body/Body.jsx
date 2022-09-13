import React from 'react';
import styles from '../styles/Body.module.css';
import { Outlet } from "react-router-dom";
import { SidebarContext } from '../../constants/AppContext';

export default function Body(props) {
  return (
    <div className={styles.body}>
      <SidebarContext.Provider value={props.setShowSidebar} >
        <Outlet />
      </SidebarContext.Provider>
    </div>
  )
}
