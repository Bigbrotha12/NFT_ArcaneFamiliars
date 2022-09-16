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

const defaultSiteState = {
    showSideBar: true,
    location: "/"
}

export const SiteContext = React.createContext(defaultSiteState);
export const LinkContext = React.createContext();
export const UserContext = React.createContext(defaultUserInfo);