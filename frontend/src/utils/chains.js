const Chains = {
    1: {
            name: "Ethereum Mainnet",
            chainId: 1,
            rpc: "https://mainnet.infura.io/v3/28b12f61dabf41379c84687973179f02",
            wss: "ws://mainnet.infura.io/v3/28b12f61dabf41379c84687973179f02",
            explorer: "https://etherscan.io/"
        },
    5: {
            name: "Ethereum Goerli",
            chainId: 5,
            rpc: "https://goerli.infura.io/v3/28b12f61dabf41379c84687973179f02",
            wss: "ws://goerli.infura.io/v3/28b12f61dabf41379c84687973179f02",
            explorer: "https://goerli.etherscan.io/"
        },
    80001: {
            name: "Polygon Mumbai",
            chainId: 80001,
            rpc: "https://polygon-mumbai.g.alchemy.com/v2/M2gbwLQB-tQY0OGgGxVt_EHuTszdyLVk",
            wss: "ws://polygon-mumbai.g.alchemy.com/v2/M2gbwLQB-tQY0OGgGxVt_EHuTszdyLVk",
            explorer: "https://mumbai.polygonscan.com/"
        }
};

export default Chains;