import { Select, MenuItem, FormControl, InputLabel, Input, Button, Typography } from '@mui/material';
import { UserContext } from '../../../constants/AppContext';

export default function BridgeWithdraw() {
    const [userInfo, setUserInfo] = React.useContext(UserContext);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit}>

            <FormControl fullWidth>
            <InputLabel id="asset-type">Asset Type</InputLabel>
                <Select value="" labelId="asset-type" label="Asset Type">
                    {userInfo.NFTs?.map(asset => (
                        <MenuItem key={asset.tokenId} value={asset.name}>{asset.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{marginTop:'15px'}} fullWidth>
                <InputLabel id="asset">Amount</InputLabel>
                <Input 
                name="amount" 
                id="amount" 
                type="number"
                inputProps={{min:'0'}}
                required
                error={userInfo.balance < amount}  
                onChange={event => setAmount(event.target.value)}
                />
            </FormControl>

            <FormControl sx={{marginTop: '10px'}} fullWidth>
                <Button variant="outlined">Withdraw</Button>
            </FormControl>

        </form>
    );
}