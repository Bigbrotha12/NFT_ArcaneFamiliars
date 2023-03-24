import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { appStore } from './state/Context';
import { IMXHandler } from './types';
import { useIMX } from './app/IMXHooks';

import Layout from './components/00_Layout/Layout';
import ComingSoon from './components/Common/ComingSoon';
import Collection from './components/03_Body/Collection/Collection';
import Welcome from './components/03_Body/Welcome/Welcome';
import Frame from './components/03_Body/Game/Frame';
import LandingPage from './components/00_Layout/LandingPage';
import AppConfig from './app/constants/AppConfig';

export default function App(): JSX.Element {
  const IMXProvider = AppConfig.Mode === "Production" ?
    { IMX: AppConfig.API.IMX.Mainnet, Link: AppConfig.API.Link.Mainnet, Collection: AppConfig.Blockchain.Collection.Mainnet } :
    { IMX: AppConfig.API.IMX.Sandbox, Link: AppConfig.API.Link.Sandbox, Collection: AppConfig.Blockchain.Collection.Sandbox };
  const IMXHook: IMXHandler = useIMX(IMXProvider.IMX, IMXProvider.Link, IMXProvider.Collection);
  const IMX = React.createContext<IMXHandler>(IMXHook);

  return (
    <React.StrictMode>
      <Provider store={appStore}>      
        <IMX.Provider value={IMXHook}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />}>
              
              </Route>
              <Route path="/app" element={<Layout />}>
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
        </IMX.Provider>
      </Provider>
    </React.StrictMode>
  ) 
}