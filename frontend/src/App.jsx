import AppLayout from './components/AppLayout';
import { AppConfig } from './constants/AppConfig';
import { LinkContext, UserContext } from './constants/AppContext';

export default function App() {
    const linkProvider = AppConfig.IMXProvider;
    const [userInfo, setUserInfo] = React.useState({});
    React.useEffect(()=>{
        setUserInfo({ NFTs: [{tokenId: 0, name: "Monster1"}, {tokenId: 1, name: "Monster2"}]});
    },[]);
    return (
        <React.StrictMode>
            <LinkContext.Provider value={linkProvider}>
              <UserContext.Provider value={[userInfo, setUserInfo]}>
                <AppLayout />
              </UserContext.Provider> 
            </LinkContext.Provider>
        </React.StrictMode>
    ) 
}
