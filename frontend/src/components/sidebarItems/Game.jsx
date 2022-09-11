import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/lightStyles.module.css';
import Unity from "../../API/Unity.jsx";

export default function Game() {
  return (
      <div className={styles.gameCanvas}>
        <Unity />
      </div>
  )
}
