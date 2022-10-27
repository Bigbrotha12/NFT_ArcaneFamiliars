import "./styles.css";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Bridge from './components/Body/Bridge/Bridge';
import Collection from './components/Body/Collection/Collection';
import Unity from './components/Body/Game/Unity';
import Marketplace from './components/Body/Market/Marketplace';
import Minter from './components/Body/Minter/Minter';
import Other from './components/Body/Minter/Other';

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