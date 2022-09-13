import { Typography, Link } from '@mui/material';
import { AppConfig } from '../../../constants/AppConfig';

export default function Marketplace() {
  return (
    <div>
      <Typography>Welcome to the Marketplace</Typography>
      <Link
      id="marketplace-IMX"
      href={AppConfig.IMXMarket}
      >Access Familiar NFT Marketplace on IMX</Link>
    </div>
  )
}
