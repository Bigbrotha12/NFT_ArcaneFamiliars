import { Link } from "react-router-dom";
//import style from '../../styles/Sidebar.module.css';
import { List, ListItem, ListItemButton, ListItemText, Divider, Typography} from '@mui/material';
import { AppConfig } from "../../app/constants/AppConfig";

export default function Sidebar() {
  return (
    <div /*className={style.sidebar}*/>
      <List>
          {AppConfig.sidebarContent.map( (section) => (
            <div key={section.label}>
              <ListItem>
                <ListItemText>
                  <Typography variant="h6">{section.label}</Typography>
                </ListItemText>
              </ListItem>
              {section.content.map( (item) => (
                <Link 
                key={item.label} 
                /*className={style.link}*/
                to={item.link}>
                  <ListItem /*className={style.link}*/>
                    <ListItemButton>                 
                        <Typography variant="body2">{item.label}</Typography>                  
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              <Divider />
            </div>
          ))}
      </List>
    </div>
  )
}
