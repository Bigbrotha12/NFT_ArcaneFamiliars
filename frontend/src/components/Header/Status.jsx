//import style from '../../styles/Header.module.css';
import { Typography } from '@mui/material';

export default function Status() {
  const items = [
    {
        id: 0,
        label: "ETH:",
        data: 35
    },
    {
        id: 1,
        label: "Familiars:",
        data: 3
    }
  ];

  return (
    <div /*className={style.headerStatus}*/>
        {items.map( item => {
          return (
          <div key={item.id} /*className={style.headerStatusItem}*/>
            <Typography variant="body1">{item.label}</Typography>
            <Typography variant="body1">{item.data}</Typography>
          </div>)
        })}
    </div>
  )
}
