export const AppConfig = {
    IMXMainEndpoint: "https://api.x.immutable.com/v1",
    IMXTestEndpoint: "https://api.ropsten.x.immutable.com/v1",
    IMXProvider: 'https://link.ropsten.x.immutable.com',
    IMXMarket: "https://market.immutable.com/",
    IMXMinter: "0x5FDCCA53617f4d2b9134B29090C87D01058e27e9",
    Web3Provider: '',
    Collection: '',
    GameFiles: {
        loader: "https://my-unity-game.s3.amazonaws.com/Game/AnimalFeeder.loader.js",
        framework: "https://my-unity-game.s3.amazonaws.com/Game/AnimalFeeder.framework.js",
        code: "https://my-unity-game.s3.amazonaws.com/Game/AnimalFeeder.wasm",
        data: "https://my-unity-game.s3.amazonaws.com/Game/AnimalFeeder.data",
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
              label: "L1 Bridge",
              link: "/bridge"
            },
            {
              label: "Change Traits",
              link: "/other"
            }
          ]
        }
      ]
}