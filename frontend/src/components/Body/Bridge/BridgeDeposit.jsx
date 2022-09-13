import style from "../../../styles/Body.module.css";
import { Select, MenuItem, FormControl, InputLabel, Button,  Input } from '@mui/material';
import { UserContext } from '../../../constants/AppContext';

export default function BridgeDeposit() {
    const [userInfo, setUserInfo] = React.useContext(UserContext);
    const [amount, setAmount] = React.useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit}>

            <FormControl fullWidth>
                <InputLabel id="asset-type">Asset Type</InputLabel>
                <Select required value="" labelId="asset-type" label="Asset Type">
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

            <FormControl sx={{marginTop:'10px'}} fullWidth>
                <Button type="submit" variant="outlined">Deposit</Button>   
            </FormControl>
            
        </form>
    );
}