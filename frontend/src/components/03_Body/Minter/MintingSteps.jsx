import { FormControl, MenuItem, Select, InputLabel, Input, Button, Typography } from "@mui/material"

export default function MintingSteps(props) {

  return (
    <>
      {props.currentStep == 0 &&
      <FormControl fullWidth>
        <InputLabel id="NFT-available">Available NFT</InputLabel>
        <Select value="" labelId='NFT-available' label="Available NFT">
          <MenuItem value={1}>Monster 1</MenuItem>
          <MenuItem value={34}>Monster 2</MenuItem>
        </Select>
      </FormControl>}

      {props.currentStep == 1 &&
      <FormControl fullWidth>
        <InputLabel id="USer-Address">Input Your Address</InputLabel>
        <Input value="" label="Address" />
      </FormControl>}

      {props.currentStep == 2 &&
      <FormControl fullWidth>
        <Typography id="Approval">Approve the Transaction</Typography>
        <Button label="Approval" variant="outlined">Approve</Button>
      </FormControl>}
    </>
  )
}
