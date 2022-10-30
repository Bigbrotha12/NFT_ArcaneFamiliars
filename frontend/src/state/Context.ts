import React from "react";
import { UserInfo, UserContextType } from "../app/Definitions";
import { IController } from "../app/IController";

export const UserContext = React.createContext<UserContextType>(null!);
export const ControllerContext = React.createContext<IController>(null!);
export const defaultUser: UserInfo = {
    address: null,
    balance: {
        imx: 0,
        preparing: 0,
        withdrawable: 0
    },
    isIMXConnected: false,
    isWeb3Connected: false,
    preferences: {
        darkTheme: false
    }
}