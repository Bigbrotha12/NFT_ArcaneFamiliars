import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Typography, Input } from '@mui/material';
import { UserContext } from '../../constants/AppContext';

export default function BridgeDeposit() {
    const [userAssets, setUserAsset] = React.useContext(UserContext);
    const [amount, setAmount] = React.useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit}>
            <Typography>Depositing to IMX</Typography>
            <FormControl fullWidth>
                <InputLabel id="asset-type">Asset Type</InputLabel>
                <Select value={asset} labelId="asset-type" label="Asset Type">
                    {userAssets.NFTs?.map(asset => (
                    <MenuItem key={asset.tokenId} value={asset.name}>{asset.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="asset">Amount</InputLabel>
                <Input 
                name="amount" 
                id="amount" 
                type="number"
                required
                error={userAssets.balance < amount}  
                placeholder="0.0"
                onChange={event => setAmount(event.target.value)}
                />
            </FormControl>
            <Button type="submit" variant="outlined">Deposit</Button>
        </form>
    );
}