import { Typography } from '@mui/material';
import React from 'react';
import style from '../../styles/Header.module.css';

export default function Status() {
  const items = [
    {
        id: 0,
        label: "Balance",
        url: ""
    },
    {
        id: 1,
        label: "Familiars",
        url: ""
    },
    {
        id: 2,
        label: "Rank",
        url: ""
    }
  ];

  return (
    <div className={style.headerNav}>
        {items.map( item => {
            return <Typography key={item.id} variant="h6">{item.label}</Typography>
        })}
    </div>
  )
}
