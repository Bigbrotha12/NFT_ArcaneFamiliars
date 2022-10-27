import React from "react";
import { UserInfo, UserContextType } from "../app/Definitions";

export const UserContext = React.createContext<UserContextType | null>(null);
export const defaultUser: UserInfo = {
    address: "",
    balance: {
        imx: 0,
        preparing: 0,
        withdrawable: 0
    },
    isConnected: false,
    preferences: {
        theme: "light"
    },
    NFTs: []
}