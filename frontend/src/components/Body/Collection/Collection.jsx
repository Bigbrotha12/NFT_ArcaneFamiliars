//import style from '../../../styles/Body.module.css';
import { Typography, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import FamiliarCard from './FamiliarCard';
import SearchBar from './SearchBar';

export default function Collection() {
  const myArray = [0, 1, 2, 3, 4];

  return (
    <Box /*className={style.collectionContainer}*/ sx={{flexGrow: 1}}>
      <div /*className={style.collectionHeader}*/ >
        <Typography variant="h5">Familiar Collection</Typography>
        <SearchBar />
      </div>
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


