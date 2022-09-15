import { Typography } from '@mui/material';
import style from '../../styles/Footer.module.css';
import imxLogo from '../../icons/logoimmutable.svg';
import { StyleTwoTone } from '@mui/icons-material';

export default function FinePrint() {
  return (
    <div className={style.footerFine}>
        <div className={style.footerIMX}>
            <Typography variant='h6' sx={{paddingRight: '8px'}}>Powered by</Typography>
            <img src={imxLogo} />
        </div>
        <small>Privacy Policy | Terms and Conditions</small>
        <small>© 2022 All rights reserved</small>

    </div>
  )
}
