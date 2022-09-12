import style from '../../styles/lightStyles.module.css';
import React from 'react'
import { Card, Tab, Tabs, Typography, CardHeader, CardContent } from '@mui/material';
import TabPanel from './TabPanel.jsx';
import BridgeDeposit from './BridgeDeposit.jsx';

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
          <TabPanel value={tabIndex} index={0}><BridgeDeposit /></TabPanel>
          <TabPanel value={tabIndex} index={1}>World</TabPanel>
        </CardContent>
      </Card>
    </div>
  )
}
