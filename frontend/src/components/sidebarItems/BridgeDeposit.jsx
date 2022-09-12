import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';
import { UserContext } from '../../constants/AppContext';

export default function BridgeDeposit() {
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
         <FormControl fullWidth>
            <InputLabel id="asset-type">Asset Type</InputLabel>
            <Select value={assetType} labelId="asset-type" label="Asset Type" onChange={handleChange}>
                <MenuItem value="ETH">ETH</MenuItem>
                <MenuItem value="NFT">NFT</MenuItem>
            </Select>
         </FormControl>

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