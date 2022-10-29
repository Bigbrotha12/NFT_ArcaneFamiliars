import React from "react";
import { IController, UserContextType } from "../../app/Definitions";
import { UserContext, ControllerContext } from "../../state/Context";
import { Button } from "@mui/material";

export default function Login() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [userInfo, ] = React.useContext<UserContextType>(UserContext);
  const controller: IController = React.useContext(ControllerContext);

  async function connect() {
    //const info: UserInfo | string = await controller.connectIMX();
    // if(typeof info === "string") {
    //   // Report error message to user
    //   return;
    // }

    // controller.storeUserData(info);
    // setUserInfo(info);
    console.log("Connect was clicked");
  }

  // function handleDisconnect() {
  //   localStorage.removeItem('address');
  //   setUserInfo(current => ({...current, address: null}));
  //   setMenuOpen({...menuOpen, open:false});
  // }

  // function openMenu(event) {
  //   setMenuOpen({anchor: event.currentTarget, open: true});
  // }

  // function closeMenu() {
  //   setMenuOpen({...menuOpen, open:false});
  // }

  // React.useEffect( () => {
  //   let address = localStorage.getItem('address');
  //   if(isAddress(address)){
  //       setUserInfo(current => ({...current, address: address}));
  //   } 
  // }, []);
  
  return (
    <div className="flex align-middle justify-center px-8 text">
      {userInfo.isConnected 
      ?
      <Button
        sx={{
          backgroundColor: "white"
        }}
        variant="outlined"
        onClick={() => setMenuOpen(true)}
      >
        {controller.formatAddress(userInfo.address)}
      </Button>
      : 
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

      {menuOpen 
      ?
      <div>
        Disconnect
      </div>
      :
      null
      }
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
