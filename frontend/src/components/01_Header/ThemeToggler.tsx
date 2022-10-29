import React from "react";
import { UserContextType } from "../../app/Definitions";
import { UserContext } from "../../state/Context";
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import { Switch } from "@mui/material";

export default function ThemeToggler(): JSX.Element {
    const [userInfo, setUserInfo] = React.useContext<UserContextType>(UserContext);
    const [dark, setDark] = React.useState<boolean>(userInfo.preferences.darkTheme);
    const handleChange = () => {
        setUserInfo((info) => { 
            info.preferences.darkTheme = !dark;
            return info })
        setDark(!dark);
    }

    return (
        <div className="flex align-middle justify-center">
            
            <Switch sx={{margin: "auto"}} color="warning" checked={dark} onChange={handleChange} />
            <DarkModeIcon color="error" sx={{margin: "auto"}} />
            
        </div>
    );
}