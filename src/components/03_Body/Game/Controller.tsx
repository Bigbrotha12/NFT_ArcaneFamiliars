import React from "react";
import Material from "../../../assets/Material";

export default function Controller() {
    return (
        <div className="flex flex-row justify-between align-middle">
            <Material.Button variant="contained">Inventory</Material.Button>
            <Material.Button variant="contained">Map</Material.Button>
            <Material.Button variant="contained">Exit Game</Material.Button>
        </div>
    );
}