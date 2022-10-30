import React from "react";
import Material from "../../assets/Material";

export default function Status() {
  const [open, setOpen] = React.useState(false);
  
  const toggleDrawer = () => {
    console.info("Toggling Drawer");
    setOpen(!open);
  }

  return (
    <div className="text-white w-54 h-full flex align-middle justify-center">
      <Material.ClickAwayListener onClickAway={() => setOpen(false)}>
        <Material.List disablePadding={true} sx={{marginTop: "4px"}} >
          <Material.ListItem onClick={toggleDrawer} >
            <Material.ListItemText primary="Balance: 32 ETH" />
            <Material.ListItemIcon sx={{display: "flex", justifyContent: "center"}}>
              {open ? <Material.ExpandLessRounded /> : <Material.ExpandMoreRounded />}
            </Material.ListItemIcon>
          </Material.ListItem>
          {open ?
          <div className="bg-[#0B022D]">
          <Material.ListItem >
            <Material.ListItemText primary="Preparing: 16 ETH" />
          </Material.ListItem> 
          <Material.ListItem>
            <Material.ListItemText primary="Withdrawable: 8 ETH" />
          </Material.ListItem>
          </div> : null
          }
        </Material.List>
      </Material.ClickAwayListener>
    </div>
  )
}
