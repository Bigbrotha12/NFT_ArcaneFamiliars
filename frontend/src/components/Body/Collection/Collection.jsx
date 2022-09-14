import { Typography, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import FamiliarCard from './FamiliarCard';

export default function Collection() {
  const myArray = [0, 1, 2, 3, 4];

  const duplicate = (times, element) => {
    let result = new Array;
    for(let i = 0; i < times; i++){
      result.push(element);
    }
    return result;
  };

  return (
    <Box sx={{flexGrow: 1, padding: 10}}>
      <Typography variant="h4">My Familiar Collection</Typography>
      <Divider />
      <Grid container spacing={2}>
        {myArray.map( (value) => {
          return (
            <Grid key={value} xs={4}>
              <FamiliarCard familiarData={familiarData} familiarStats={familiarStats}/>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

const familiarStats = {
  hp: 300,
  mp: 80,
  atk: 76,
  def: 11,
  arc: 120,
  spd: 66
}

const familiarData = {
  name: "White Dog",
  description: "This Familiar summoned from the plane of Light makes quick work of its enemies. Its speed and attack power is almost unrivalled among familiars and, best of all, makes for a great friend.",
  familiarId: "0001",
  affinity: "Light",
  rarity: "Common"
}


