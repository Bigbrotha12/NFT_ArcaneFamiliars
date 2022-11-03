
// import Footer from "./components/04_Footer/Footer";
import React from "react";
// import Header from "./components/01_Header/Header";
//import Sidebar from "./components/02_Sidebar/Sidebar";
// import Body from "./components/03_Body/Body";
import ComingSoon from "./components/Common/ComingSoon";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Handles app routing
export default function Router() {
  
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ComingSoon />}>
                <Route path="game" element={<ComingSoon />} />
                <Route path="collection" element={<ComingSoon />} />
                <Route path="marketplace" element={<ComingSoon />} />
                <Route path="minter" element={<ComingSoon />} />
                <Route path="bridge" element={<ComingSoon />} />
                <Route path="other" element={<ComingSoon />} />
            </Route>
            <Route path="*" element={<ComingSoon />} />
        </Routes>
    </BrowserRouter>
  )
}

