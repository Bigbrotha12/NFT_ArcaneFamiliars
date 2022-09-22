const defaultUserInfo = {
    address: "",
    balance: {
        imx: 0,
        preparing: 0,
        withdrawable: 0
    },
    isConnected: false,
    NFTs: [
        {
            name: "",
            description: "",
            image_url: "",
            tokenId: 0,
            metadata: {},
            status: ""
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