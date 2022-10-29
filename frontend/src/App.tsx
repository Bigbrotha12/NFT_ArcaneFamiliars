import { IController, UserInfo } from './app/Definitions';
import React, { useEffect } from 'react';
import Layout from './Layout';
import { defaultUser, UserContext, ControllerContext } from './state/Context';
import { AppController } from './app/AppController';

// Handles state management and caching
export default function App() {
    const [userInfo, setUserInfo] = React.useState(defaultUser);
    const controller: IController = new AppController();

    useEffect(() => {
      const info: UserInfo | null = controller.getUserData();
      if(info) {setUserInfo(info)};

      return controller.storeUserData(userInfo);
    },[]);

    return (
      <React.StrictMode>
        <ControllerContext.Provider value={controller}>
          <UserContext.Provider value={[userInfo, setUserInfo]}>
            <Layout />
          </UserContext.Provider> 
        </ControllerContext.Provider>
      </React.StrictMode>
    ) 
}