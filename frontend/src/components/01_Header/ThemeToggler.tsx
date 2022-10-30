import React from "react";
import { UserContextType } from "../../app/Definitions";
import { UserContext } from "../../state/Context";
import Material from "../../assets/Material";

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
            
            <Material.Switch sx={{margin: "auto"}} color="warning" checked={dark} onChange={handleChange} />
            <Material.DarkModeIcon color="warning" sx={{margin: "auto"}} />
            
        </div>
    );
}