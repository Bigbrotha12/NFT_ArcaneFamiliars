import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../../state/Context";
import Material from "../../assets/Material";
import Formatter from "../../app/utils/Formatter";
import { useIMX } from "../../app/IMXHooks";
import { IMXBalance } from "../../app/Definitions";

export default function Login() {
  const [menu, setMenu] = React.useState<{anchor: HTMLElement | null, open: boolean}>
    ({ anchor: null, open: false });
  const [client, , loading, error] = useIMX();
  const userAddress = useSelector<RootState, string>(state => state.session.address);

  return (
    <div className="flex align-middle justify-center px-8 text">
      <Material.ClickAwayListener onClickAway={() => setMenu(state => { return { ...state, open: false } })}>
        <React.Fragment>
        {userAddress ?
        <Material.Button
          sx={{
            backgroundColor: "rgba(0,0,0,0)",
            border: "none",
            color: "white",
            fontWeight: "bold"
          }}
          variant="outlined"
              onClick={(event) => setMenu({ anchor: event.target as HTMLElement, open: true})}
        >
          {Formatter.formatAddress(userAddress)}
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
          onClick={client.connect}>
          Connect
        </Material.Button>}

        {menu &&
          <Material.Menu anchorEl={menu.anchor} open={menu.open} onClose={() => setMenu(state => { return { ...state, open: false } })}>
            <Material.MenuItem onClick={client.disconnect}>Disconnect</Material.MenuItem>
          </Material.Menu>}
        </React.Fragment>
      </Material.ClickAwayListener>
    </div>
  )
}
