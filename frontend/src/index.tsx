import React from "react";
import { createRoot, Root } from 'react-dom/client';
import "./styles.css";
import App from "./App";

const container: HTMLElement = document.getElementById("root")!
const root: Root = createRoot(container);

root.render(<App />);