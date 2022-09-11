import React from 'react';
import styles from '../styles/lightStyles.module.css';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography} from '@mui/material';
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const sidebarContent = [
    {
      label: "Familiars",
      content: [
        {
          label: "Play Game",
          link: "/game"
        },
        {
          label: "My Collection",
          link: "/collection"
        },
        {
          label: "Marketplace",
          link: "/marketplace"
        },
        {
          label: "Mint",
          link: "/minter"
        }
      ]
    },
    {
      label: "Transactions",
      content: [
        {
          label: "L1 Bridge",
          link: "/bridge"
        },
        {
          label: "Change Traits",
          link: "/other"
        }
      ]
    }
  ];

  return (
    <div className={styles.sidebar}>
      <List>
          {sidebarContent.map( (section) => (
            <div key={section.label}>
              <ListItem>
                <ListItemText>
                  <Typography variant="h6">{section.label}</Typography>
                </ListItemText>
              </ListItem>
              {section.content.map( (item) => (
                <ListItem key={item.label}>
                  <ListItemButton>
                    <Link className={styles.link} to={item.link}>{item.label}</Link>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />
            </div>
          ))}
      </List>
    </div>
  )
}
