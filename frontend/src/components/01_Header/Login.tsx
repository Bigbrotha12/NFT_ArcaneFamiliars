import React from "react";
import { UserContextType } from "../../app/Definitions";
import { IController } from "../../app/IController";
import { UserContext, ControllerContext } from "../../state/Context";
import { Button, ClickAwayListener, Menu, MenuItem } from "@mui/material";
import Formatter from "../../app/Formatter";

export default function Login() {
  const [userInfo, setUserInfo] = React.useContext<UserContextType>(UserContext);
  const controller: IController = React.useContext<IController>(ControllerContext);
  const [menu, setMenu] = React.useState<{anchor: HTMLElement | null, open: boolean}>
    ({ anchor: null, open: false});

  function openMenu(event: React.MouseEvent<HTMLElement>): void {
    setMenu({anchor: event.currentTarget, open: true});
  }

  function closeMenu(): void {
    setMenu((menu) => {return {...menu, open: false}});
  }

  async function connect(): Promise<void | null> {
    const userAddress: string | null = await controller.connectIMX();
    
    if(userAddress === null) {
       return null;
    }

    setUserInfo((user) => { return {
      ...user,
      address: userAddress,
      isIMXConnected: true
    }});
  }

  function disconnect() {
    controller.deleteUserData();

    setUserInfo((info) => { return {...info, address: null}});
    closeMenu();
  }

  React.useEffect(() => {
    if(userInfo.isIMXConnected) {
      controller.storeUserData(userInfo);
    }
  }, [userInfo.address]);
  
  return (
    <div className="flex align-middle justify-center px-8 text">
      <ClickAwayListener onClickAway={closeMenu}>
        <>
        {userInfo.address ?
        <Button
          sx={{
            backgroundColor: "rgba(0,0,0,0)",
            border: "none",
            color: "white",
            fontWeight: "bold"
          }}
          variant="outlined"
          onClick={(event) => openMenu(event)}
        >
          {Formatter.formatAddress(userInfo.address)}
        </Button> : 
        <Button 
          sx={{
            margin: "auto",
            height: "2.5rem",
            width: "8rem",
            backgroundColor: "#F9CF00",
            color: "black"
          }}
          variant="contained"
          onClick={connect}>
          Connect
        </Button>}

        {menu ?
          <Menu anchorEl={menu.anchor} open={menu.open} onClose={closeMenu}>
            <MenuItem onClick={disconnect}>Disconnect</MenuItem>
          </Menu>
        : null}
        </>
      </ClickAwayListener>
        {/* {userInfo.address ? 
        <div >
          <LoginIcon sx={{paddingLeft: '5px', alignSelf: 'center', color: '#51e656'}}/>
          <Button onClick={openMenu}>
            <Typography className={style.userAddress}>{shortAddress(userInfo.address)}</Typography>
          </Button>
        </div> : 
        <Button 
        sx={{backgroundColor: '#16BDE2'}} 
        variant="contained"
        onClick={handleLogin}
        >IMX Login</Button>}
        <Menu anchorEl={menuOpen?.anchor} open={menuOpen.open} onClose={closeMenu}>
            <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
        </Menu> */}
         
    </div>
  )
}
