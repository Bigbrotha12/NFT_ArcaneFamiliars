import { Typography, Link, Card, Box } from '@mui/material';
import { AppConfig } from '../../../constants/AppConfig';
import FamiliarCard from '../Collection/FamiliarCard';
import MarketModal from './MarketModal';

export default function Marketplace() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleClick = (event) => {
    setOpenModal(true);
  }

  return (
    <div>
      <Typography>Welcome to the Marketplace</Typography>
      <Box onClick={handleClick}>
        <FamiliarCard familiarData={familiarData} familiarStats={familiarStats}/>
      </Box>
      {openModal && <MarketModal />}
    </div>
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
