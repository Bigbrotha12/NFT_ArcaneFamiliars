import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/appStyles.module.css';

export default function Game() {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameCanvas}>
        <Typography>Game Loading...</Typography>
      </div>
    </div>
  )
}
