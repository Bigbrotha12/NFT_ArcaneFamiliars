import { UserInfo } from './app/Definitions';
import React, { useEffect } from 'react';
import Layout from './Layout';
import { defaultUser, UserContext } from './state/Context';
import { AppController } from './app/AppController';

// Handles state management via context
export default function App() {
    const [userInfo, setUserInfo] = React.useState({} as UserInfo);

    useEffect(() => {
      const defaultInfo: UserInfo = defaultUser;
      const controller: AppController = new AppController();
      const info: UserInfo | null = controller.getUserData();
      
      info ? setUserInfo(info) : setUserInfo(defaultInfo);
      
    },[]);

    return (
        <React.StrictMode>
                <UserContext.Provider value={[userInfo, setUserInfo]}>
                  <Layout />
                  <h1 className='flex'></h1>
                </UserContext.Provider> 
        </React.StrictMode>
    ) 
}