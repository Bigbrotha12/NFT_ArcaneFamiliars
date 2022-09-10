import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/appStyles.module.css';

export default function Nav() {
  const navItems = [
    {
        id: 0,
        label: "Home",
        url: ""
    },
    {
        id: 1,
        label: "About",
        url: ""
    },
    {
        id: 2,
        label: "Marketplace",
        url: ""
    }
  ];

  return (
    <div className={styles.headerNav}>
        {navItems.map( item => {
            return <Typography key={item.id} variant="h6">{item.label}</Typography>
        })}
    </div>
  )
}
