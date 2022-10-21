import { Typography } from '@mui/material';
//import style from '../../styles/Footer.module.css';

export default function FooterSections(props) {
  return (
    <div /*className={style.footerContainer}*/>
      {props.sections.map(section => {
        return (
          <div /*className={style.footerSections}*/ key={section.label}>
          <Typography variant='h5'>{section.label}</Typography>
          <Typography variant='b2'>{section.data}</Typography>
          </div>
        )
      })}
    </div>
  )
}
