//import style from '../../styles/Footer.module.css';
import twitter from '../../icons/twitter.png';
import facebook from '../../icons/facebook.png';
import telegram from '../../icons/telegram.png';
import discord from '../../icons/discord.png';
import { Typography } from '@mui/material';

export default function 
() {
  return (
    <div /*className={style.footerCommunity}*/>
        <Typography variant='h5'>Join the Community!</Typography>
        <div /*className={style.footerIconContainer}*/>
            <img /*className={style.footerIcons}*/ src={twitter}/>
            <img /*className={style.footerIcons}*/ src={facebook}/>
            <img /*className={style.footerIcons}*/ src={discord}/>
            <img /*className={style.footerIcons}*/ src={telegram}/>
        </div> 
    </div>
  )
}
