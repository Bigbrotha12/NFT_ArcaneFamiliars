import { FormControl, InputLabel, MenuItem, Select, Typography, Card } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import Stepper from "./Stepper";

export default function Minter() {
  return (
    <Card sx={{padding: '20px'}}>
      <Stepper />
    </Card>
    
    /*
    <div>
      <Typography>Here you can mint new Familiar NFTs!</Typography>
      <FormControl fullWidth>
        <InputLabel id="NFT-available">Available NFT</InputLabel>
        <Select value="" labelId='NFT-available' label="Available NFT">
          <MenuItem value={1}>Monster 1</MenuItem>
          <MenuItem value={34}>Monster 2</MenuItem>
        </Select>
      </FormControl>
    </div>
    */
  )
}
