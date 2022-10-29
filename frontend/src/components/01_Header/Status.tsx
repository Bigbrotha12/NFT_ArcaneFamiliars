import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, ClickAwayListener } from "@mui/material";
import {ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';

export default function Status() {
  const [open, setOpen] = React.useState(false);
  
  const toggleDrawer = () => {
    console.info("Toggling Drawer");
    setOpen(!open);
  }

  return (
    <div className="text-white w-54 h-full flex align-middle justify-center">
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <List disablePadding={true} sx={{marginTop: "4px"}} >
          <ListItem onClick={toggleDrawer} >
            <ListItemText primary="Balance: 32 ETH" />
            <ListItemIcon sx={{display: "flex", justifyContent: "center"}}>
              {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            </ListItemIcon>
          </ListItem>
          {open ?
          <div className="bg-[#0B022D]">
          <ListItem >
            <ListItemText primary="Preparing: 16 ETH" />
          </ListItem> 
          <ListItem>
            <ListItemText primary="Withdrawable: 8 ETH" />
          </ListItem>
          </div> : null
          }
        </List>
      </ClickAwayListener>
    </div>
  )
}
