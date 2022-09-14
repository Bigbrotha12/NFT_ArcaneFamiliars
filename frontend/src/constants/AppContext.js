const defaultUserInfo = {
    address: "",
    balance: "",
    NFTs: [
        {
            name: "Monster 1",
            tokenId: 0,
        },
        {
            name: "Monster 2",
            tokenId: 1,
        }
    ]
}


export const SidebarContext = React.createContext();
export const LinkContext = React.createContext();
export const UserContext = React.createContext(defaultUserInfo);