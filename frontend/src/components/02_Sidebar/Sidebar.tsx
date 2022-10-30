import React from "react";
import Config from "../../app/constants/AppConfig.json"
import { Link } from "react-router-dom";
import { List, ListItemText, ListItem, Divider, ListItemIcon } from '@mui/material';
import Cards from "../../assets/icons/Cards 2.png";
import Grimoire from "../../assets/icons/Grimoire 3.png";
import Runes from "../../assets/icons/Runes 3.png";
import Tower1 from "../../assets/icons/Tower 2.png";
import Tower2 from "../../assets/icons/Tower 3.png";

export default function Sidebar() {
  const icons: Array<string> = [Tower1, Grimoire, Runes, Cards, Tower2];
  
  function createSections(): Array<JSX.Element> {
    return Config.SiteContent.sidebar.map( section => {
      return (
        <div key={section.title} >
          <ListItem>
            <ListItemText>
              {section.title}
            </ListItemText>
          </ListItem>
          <Divider />
          {createItems(section)}
        </div>)
    })
  }

  function createItems(section: any): Array<JSX.Element> {
      return section.content.map((item: any) => {
        return (
        <div key={item.label}>
          <ListItem>
            <ListItemIcon>
              <img className="rounded-[50%] m-auto h-[30px]" src={icons.shift()} width="30px" height="30px"></img>
            </ListItemIcon>
            <Link to={item.link}>{item.label}</Link>
          </ListItem>
        </div>)
      })
  }

  return (
    <div className="b-2 w-1/5 h-screen relative left-0 shadow-[0_8px_6px_-6px_rgba(0,0,0,0.8)]">
      <List>
        {createSections()}
      </List>
    </div>
  )
}
