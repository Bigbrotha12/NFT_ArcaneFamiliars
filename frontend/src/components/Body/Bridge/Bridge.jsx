import style from '../../../styles/Body.module.css';
import { Card, Tab, Tabs, CardHeader, CardContent } from '@mui/material';
import BridgeDeposit from './BridgeDeposit';
import BridgeWithdraw from './BridgeWithdraw';

export default function Bridge() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleChange = (event, value) => {
    setTabIndex(value);
  }

  return (
    <div className={style.bridgeContainer}>
      <Card raised={true}>
        <CardHeader title={
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="Deposit to IMX" />
            <Tab label="Withdraw to Ethereum" />
          </Tabs>
        } />
        <CardContent>
          {tabIndex === 0 && <BridgeDeposit />}
          {tabIndex === 1 && <BridgeWithdraw />}
        </CardContent>
      </Card>
    </div>
  )
}
