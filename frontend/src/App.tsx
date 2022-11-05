import React from 'react';
import { UserInfo } from './app/Definitions';
import { IController } from './app/IController';
import { AppController } from './app/AppController';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { defaultUser, UserContext, ControllerContext } from './state/Context';

import Layout from './Layout';
import ComingSoon from './components/Common/ComingSoon';
import Collection from './components/03_Body/Collection/Collection';
import Welcome from './components/03_Body/Welcome/Welcome';
import Frame from './components/03_Body/Game/Frame';

// Handles global state management, caching, and client-side routing
export default function App(): JSX.Element {
    const [userInfo, setUserInfo] = React.useState<UserInfo>(defaultUser);
    const controller: IController = new AppController();
  
    React.useEffect(() => {
      const info: UserInfo | null = controller.getUserData();
      if(info) {setUserInfo(info)};

      return controller.storeUserData(userInfo);
    },[]);

    return (
      <React.StrictMode>
          <ControllerContext.Provider value={controller}>
            <UserContext.Provider value={[userInfo, setUserInfo]}>
            
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Welcome />} />
                      <Route path="game" element={<Frame />} />
                      <Route path="collection" element={<Collection />} />
                      <Route path="marketplace" element={<ComingSoon />} />
                      <Route path="minter" element={<ComingSoon />} />
                      <Route path="bridge" element={<ComingSoon />} />
                      <Route path="other" element={<ComingSoon />} />
                      <Route path="*" element={<ComingSoon />} />
                  </Route>
              </Routes>
            </BrowserRouter>

            </UserContext.Provider> 
          </ControllerContext.Provider>
      </React.StrictMode>
    ) 
}