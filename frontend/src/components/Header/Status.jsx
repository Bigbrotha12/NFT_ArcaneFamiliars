import style from '../../styles/Header.module.css';
import { Typography } from '@mui/material';

export default function Status() {
  const items = [
    {
        id: 0,
        label: "ETH Balance:",
        data: 35
    },
    {
        id: 1,
        label: "Familiars:",
        data: 3
    }
  ];

  return (
    <div className={style.headerStatus}>
        {items.map( item => {
          return (
          <div className={style.headerStatusItem}>
            <Typography key={item.id} variant="h6">{item.label}</Typography>
            <Typography key={item.data} variant="h6">{item.data}</Typography>
          </div>)
        })}
    </div>
  )
}
