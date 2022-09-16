import AppLayout from './components/AppLayout';
import { AppConfig } from './constants/AppConfig';
import { LinkContext, UserContext, SiteContext } from './constants/AppContext';

export default function App() {
    const linkProvider = AppConfig.IMXProvider;
    const [userInfo, setUserInfo] = React.useState({});
    const [siteState, setSiteState] = React.useState({});

    return (
        <React.StrictMode>
            <LinkContext.Provider value={linkProvider}>
              <SiteContext.Provider value={[siteState, setSiteState]}>
                <UserContext.Provider value={[userInfo, setUserInfo]}>
                  <AppLayout />
                </UserContext.Provider> 
              </SiteContext.Provider>
            </LinkContext.Provider>
        </React.StrictMode>
    ) 
}
