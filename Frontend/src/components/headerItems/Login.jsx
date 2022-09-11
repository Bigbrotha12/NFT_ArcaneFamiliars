import React from 'react';
import styles from '../../styles/lightStyles.module.css';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from '@imtbl/imx-sdk';
import web3Utils from 'web3-utils';
import { shortAddress } from '../../utils/shortAddress';

export default function Login(props) {
  const [userAddress, setUserAddress] = props.address;
  const [menuOpen, setMenuOpen] = React.useState({open: false});
  const provider = 'https://link.ropsten.x.immutable.com';

  async function handleLogin() {
    let link = new Link(provider);
    const { address } = await link.setup({});
    localStorage.setItem('address', address);
    setUserAddress(address);
  }

  function openMenu(event) {
    setMenuOpen({anchor: event.currentTarget, open: true});
  }

  function closeMenu() {
    setMenuOpen({...menuOpen, open:false});
  }

  function menuDisconnect() {
    localStorage.removeItem('address');
    setUserAddress('');
    setMenuOpen({...menuOpen, open:false});
  }

  React.useEffect( () => {
    let address = localStorage.getItem('address');
    if(web3Utils.isAddress(address)){
        setUserAddress(address);
    } 
  }, []);

  return (
    <div className={styles.headerLogin}>
        {userAddress ? 
        <Button onClick={openMenu}>{shortAddress(userAddress)}</Button> : 
        <Button 
        sx={{backgroundColor: '#16BDE2'}} 
        variant="contained"
        onClick={handleLogin}
        >IMX Login</Button>}
        <Menu anchorEl={menuOpen?.anchor} open={menuOpen.open} onClose={closeMenu}>
            <MenuItem onClick={menuDisconnect}>Disconnect</MenuItem>
        </Menu>
    </div>
  )
}
