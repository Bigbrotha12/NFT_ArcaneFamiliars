import React from "react";
import { createRoot, Root } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

import App from "./App";
import Bridge from './components/03_Body/Bridge/Bridge';
import Collection from './components/03_Body/Collection/Collection';
import Unity from './components/03_Body/Game/Unity';
import Marketplace from './components/03_Body/Market/Marketplace';
import Minter from './components/03_Body/Minter/Minter';
import Other from './components/03_Body/Minter/Other';


const container: HTMLElement = document.getElementById("root")!
const root: Root = createRoot(container);

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