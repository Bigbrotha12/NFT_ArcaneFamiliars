import { createRoot } from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from "./App.jsx";
import Bridge from './components/sidebarItems/Bridge.jsx';
import Collection from './components/sidebarItems/Collection.jsx';
import Unity from './components/sidebarItems/Unity.jsx';
import Marketplace from './components/sidebarItems/Marketplace.jsx';
import Minter from './components/sidebarItems/Minter.jsx';
import Other from './components/sidebarItems/Other.jsx';

const container = document.getElementById("root")
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="game" element={<Unity />} />
                <Route path="collection" element={<Collection />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="minter" element={<Minter />} />
                <Route path="bridge" element={<Bridge />} />
                <Route path="other" element={<Other />} />
            </Route>
            <Route path="*" element={<App />} />
        </Routes>
    </BrowserRouter>

);