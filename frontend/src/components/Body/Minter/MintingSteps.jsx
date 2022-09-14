import { FormControl, MenuItem, Select, InputLabel } from "@mui/material"

export default function MintingSteps() {
  return (
    <FormControl fullWidth>
        <InputLabel id="NFT-available">Available NFT</InputLabel>
        <Select value="" labelId='NFT-available' label="Available NFT">
          <MenuItem value={1}>Monster 1</MenuItem>
          <MenuItem value={34}>Monster 2</MenuItem>
        </Select>
      </FormControl>
  )
}
