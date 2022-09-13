import style from '../../styles/Header.module.css';
import { Typography } from '@mui/material';

export default function Title() {
  return (
    <div className={style.headerTitle}>
        <Typography variant="h4" >Arcane Familiars</Typography>
    </div>
  )
}
