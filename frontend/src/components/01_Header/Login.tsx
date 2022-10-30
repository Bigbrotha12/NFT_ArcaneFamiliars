import React from "react";
import { UserContextType } from "../../app/Definitions";
import { IController } from "../../app/IController";
import { UserContext, ControllerContext } from "../../state/Context";
import Material from "../../assets/Material";
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
      <Material.ClickAwayListener onClickAway={closeMenu}>
        <>
        {userInfo.address ?
        <Material.Button
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
        </Material.Button> : 
        <Material.Button 
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
        </Material.Button>}

        {menu ?
          <Material.Menu anchorEl={menu.anchor} open={menu.open} onClose={closeMenu}>
            <Material.MenuItem onClick={disconnect}>Disconnect</Material.MenuItem>
          </Material.Menu>
        : null}
        </>
      </Material.ClickAwayListener>
    </div>
  )
}
