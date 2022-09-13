const defaultUserInfo = {
    address: "",
    balance: "",
    NFTs: [
        {
            name: "",
            tokenId: 0,
        }
    ]
}


export const SidebarContext = React.createContext();
export const LinkContext = React.createContext();
export const UserContext = React.createContext(defaultUserInfo);