import React from "react";
import Config from "../../app/constants/AppConfig"
import { Link } from "react-router-dom";
import Material from "../../assets/Material";

const Cards = `${Config.SiteContent.assets.images}Cards 2.png`;
const Grimoire = `${Config.SiteContent.assets.images}Grimoire 3.png`;
const Runes = `${Config.SiteContent.assets.images}Runes 3.png`;
const Tower1 = `${Config.SiteContent.assets.images}Tower 2.png`;
const Tower2 = `${Config.SiteContent.assets.images}Tower 3.png`;

export default function Sidebar() {
  const icons: Array<string> = [Tower1, Grimoire, Runes, Cards, Tower2];
  
  function createSections(): Array<JSX.Element> {
    return Config.SiteContent.sidebar.map( section => {
      return (
        <div key={section.title} >
          <Material.ListItem>
            <Material.ListItemText>
              {section.title}
            </Material.ListItemText>
          </Material.ListItem>
          <Material.Divider />
          {createItems(section)}
        </div>)
    })
  }

  function createItems(section: any): Array<JSX.Element> {
      return section.content.map((item: any) => {
        return (
        <div key={item.label}>
          <Material.ListItem>
            <Material.ListItemIcon>
              <img className="rounded-[50%] m-auto h-[30px]" src={icons.shift()} width="30px" height="30px"></img>
            </Material.ListItemIcon>
            <Link to={item.link}>{item.label}</Link>
          </Material.ListItem>
        </div>)
      })
  }

  return (
    <div className="b-2 w-1/5 h-screen fixed left-0 shadow-[0_8px_6px_-6px_rgba(0,0,0,0.8)]">
      <Material.List>
        {createSections()}
      </Material.List>
    </div>
  )
}
