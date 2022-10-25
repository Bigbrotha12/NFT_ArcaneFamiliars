import { Typography, Link, Card, Box } from '@mui/material';
import { AppConfig } from '../../../constants/AppConfig';
import FamiliarCard from '../Collection/FamiliarCard';
import MarketModal from './MarketModal';

export default function Marketplace() {
  const myArray = [0, 1, 2, 3, 4];
  const [openModal, setOpenModal] = React.useState(false);
  const handleClick = (item) => {
    setOpenModal(true);
    console.log(item);
  }

  return (
    <p>Feature Coming Soon...</p>

    // <div>
    //   <Typography>Welcome to the Marketplace</Typography>
    //   <div style={{display: "flex"}}>
    //     {myArray.map(item => {
    //       return (
    //       <Box key={item} onClick={() => handleClick(item)}>
    //         <FamiliarCard familiarData={familiarData} familiarStats={familiarStats}/>
    //       </Box>)
    //     })}
    //   </div>
    //   {openModal && <MarketModal data={familiarData} stats={familiarStats}/>}
    // </div>
  )
}


// API Request
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
