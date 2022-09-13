import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, TextField, Button, Typography } from '@mui/material';
import { UserContext } from '../../constants/AppContext';

export default function BridgeWithdraw() {
    const [assetType, setAssetType] = React.useState("");
    const [asset, setAsset] = React.useState(""); 
    const [userAssets, setUserAsset] = React.useContext(UserContext);
    

    const handleChange = (event) => {
        setAssetType(event.target.value);
        console.log(event.target);
    }

    const handleAssetChange = (event) => {
        setAsset(event.target.value);
        console.log(event.target);
    }

    return(
        <div>
         <Typography>Withdraw NFT to Ethereum</Typography>

         <FormControl fullWidth>
         <InputLabel id="asset-type2">Asset Type</InputLabel>
            <Select value={asset} labelId="asset-type2" label="Asset Type2" onChange={handleAssetChange}>
                {userAssets.NFTs?.map(asset => (
                    <MenuItem key={asset.tokenId} value={asset.name}>{asset.name}</MenuItem>
                ))}
            </Select>
        </FormControl>

        <Button variant="outlined">Deposit</Button>

        </div>
    );
}