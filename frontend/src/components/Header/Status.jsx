import style from '../../styles/Header.module.css';
import { Typography } from '@mui/material';

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
