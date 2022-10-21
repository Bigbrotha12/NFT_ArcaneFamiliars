export const AppConfig = {
    IMXMainEndpoint: "https://api.x.immutable.com/v1",
    ///IMXTestEndpoint: "https://api.ropsten.x.immutable.com/v1",
    IMXSandboxAPI: "https://api.sandbox.x.immutable.com",
    IMXProvider: 'https://link.sandbox.x.immutable.com',
    IMXMarket: "https://market.immutable.com/",
    IMXMinter: "0x5FDCCA53617f4d2b9134B29090C87D01058e27e9",
    Web3Provider: '',
    Collection: '',
    GameFiles: {
        loader: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/game/Build.loader.js",
        framework: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/game/Build.framework.js",
        code: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/game/Build.wasm",
        data: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/game/Build.data",
        images: "https://my-unity-game.s3.amazonaws.com/Images/",
        abilities: "https://my-unity-game.s3.amazonaws.com/Abilities/",
        stats: "https://my-unity-game.s3.amazonaws.com/Stats/"
    },
    sidebarContent: [
        {
          label: "Familiars",
          content: [
            {
              label: "Play Game",
              link: "/game"
            },
            {
              label: "Collection",
              link: "/collection"
            },
            {
              label: "Marketplace",
              link: "/marketplace"
            },
            {
              label: "Mint",
              link: "/minter"
            }
          ]
        },
        {
          label: "Transactions",
          content: [
            {
              label: "Bridge",
              link: "/bridge"
            }
          ]
        }
      ]
}