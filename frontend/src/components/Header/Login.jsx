import style from '../../styles/Header.module.css';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import DataSaverOffRoundedIcon from '@mui/icons-material/DataSaverOffRounded';
import { LinkContext, UserContext } from '../../constants/AppContext'; 
import { IMXLink } from '../../API/IMXLink';
import web3Utils from 'web3-utils';
import { shortAddress } from '../../utils/shortAddress';

export default function Login() {
  const [menuOpen, setMenuOpen] = React.useState({open: false});
  const [userInfo, setUserInfo] = React.useContext(UserContext);
  const provider = React.useContext(LinkContext);

  async function handleLogin() {
    let { address } = await IMXLink.setupAccount(provider);
    localStorage.setItem('address', address);
    setUserInfo(current => ({...current, address: address}));
  }

  function openMenu(event) {
    setMenuOpen({anchor: event.currentTarget, open: true});
  }

  function closeMenu() {
    setMenuOpen({...menuOpen, open:false});
  }

  function menuDisconnect() {
    localStorage.removeItem('address');
    setUserInfo(current => ({...current, address: null}));
    setMenuOpen({...menuOpen, open:false});
  }

  React.useEffect( () => {
    let address = localStorage.getItem('address');
    if(web3Utils.isAddress(address)){
        setUserInfo(current => ({...current, address: address}));
    } 
  }, []);

  return (
    <div className={style.headerLogin}>
        {userInfo.address ? 
        <div className={style.userAddressContainer}>
          <DataSaverOffRoundedIcon sx={{paddingLeft: '5px', alignSelf: 'center', color: '#51e656'}}/>
          <Button 
          onClick={openMenu}>
            <Typography className={style.userAddress}>{shortAddress(userInfo.address)}</Typography>
          </Button>
        </div> : 
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
