import { Select, MenuItem, FormControl, InputLabel, Input, Button, Typography } from '@mui/material';
import { UserContext } from '../../../app/constants/AppContext';

export default function BridgeWithdraw() {
    const [userInfo, setUserInfo] = React.useContext(UserContext);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit}>
            <Typography sx={{maxWidth:"500px", marginBottom:"20px"}}>
                You can withdraw ETH and Familiar NFTs from Layer 2 IMX to Ethereum. 
                Note that this transaction will incur gas fees. Deposited assets are usually
                available 24 hours after submission.
            </Typography>
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