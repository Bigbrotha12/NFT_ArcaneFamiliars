import React from 'react';
import styles from '../../styles/lightStyles.module.css';
import { Typography } from '@mui/material';

export default function Title() {
  return (
    <div className={styles.headerTitle}>
        <Typography variant="h4" >Arcane Familiars</Typography>
    </div>
  )
}
