import { Link } from '@imtbl/imx-sdk';
import { Description } from '@mui/icons-material';
import { AppConfig } from '../constants/AppConfig';

export const IMXLink = {

  // Layer 2 frontend NFT queries

    // Mainnet
    //const linkAddress = 'https://link.x.immutable.com';
    //const apiAddress = 'https://api.x.immutable.com/v1';

    // Ropsten Testnet
    //linkAddress = 'https://link.ropsten.x.immutable.com';
    //const apiAddress = 'https://api.ropsten.x.immutable.com/v1';

    // Link SDK
    async setupAccount(provider) {
        let link = new Link(provider);
        let result = await link.setup({});
        return result;
    },

    // Currently IMX only support ETH and whitelisted ERC20 tokens. No NFTs
    async deposit(provider, amount) {
        let link = new Link(provider);
        let result;
        try {
            result = await link.deposit({
                "type": "ETH",
                "amount": amount
            });
        } catch(error) {
            console.error(error);
        }
        return result;
    },

    // Currently IMX only support ETH and whitelisted ERC20 tokens.
    async prepareWithdraw(provider, amount){
        let link = new Link(provider);
        let result;
        try{
        let result = await link.prepareWithdrawal({
            "type": "ETH",
            "amount": amount
        })} catch(error){
        console.error(error)
        }
        return result;
    },

    // Currently IMX only support ETH and whitelisted ERC20 tokens.
    async completeWithdraw(provider, type, tokenId, tokenAddress){
        let link = new Link(provider);
        let result;
        try{
        let result = await link.completeWithdrawal({
          "type": "ETH",
          "amount": amount
        })} catch(error){
        console.error(error)
        }
        return result;
    },

    // Token Type, TokenID, Collection Addr, Amount[optional], ERC20 addr.[optional] 
  async sellOrderNFT() {
    // Initialize Link
    let link = new Link('https://link.x.immutable.com')

    try{
      // Call the method
      let result = await link.sell({})
      // Print the result
      console.log(result)
    }catch(error){
      // Catch and print out the error
      console.error(error)
    }
  },

  // Order ID
  async cancelOrderNFT(){
    // Initialize Link
    let link = new Link('https://link.x.immutable.com')

    try{
      // Call the method
      let result = await link.cancel({})
      // Print the result
      console.log(result)
    }catch(error){
      // Catch and print out the error
      console.error(error)
    }
  },

  // OrderIDs[]
  async buyOrderNFT(){
    // Initialize Link
    let link = new Link('https://link.x.immutable.com')

    try{
      // Call the method
      let result = await link.buy({})
      // Print the result
      console.log(result)
    }catch(error){
      // Catch and print out the error
      console.error(error)
    }
  },

  async txHistory() {
    // Initialize Link
    let link = new Link('https://link.x.immutable.com')

    try{
      // Call the method
      let result = await link.history({})
      // Print the result
      console.log(result)
    }catch(error){
      // Catch and print out the error
      console.error(error)
    }
  },

  // IMMUTABLE API

  async getAssets() {
    let result;
    fetch('https://api.ropsten.x.immutable.com/v1/assets').then(res => {
      result = res.json();
    });

    // query parameter: url/resource?parameter1=value1&parameter2=value2
    // 'name' - name of asset to search
    // 'page_size' - page size of results
    // 'cursor' - number of page
    // 'buy_orders' - fetch buy orders only
    // 'sell_orders' - fetch sell orders only
    // 'user' - address that owns these assets
    // 'collection' - address of NFT contract

  },

  async getAssetDetail() {
    let result;
    fetch('https://api.ropsten.x.immutable.com/v1/assets/{token_address}/{token_id}').then(res => {
      result = res.json();
    })

    // query parameter: url/resource/token_address/token_id
    
  },

  async getAllTokenBalances() {
    let result;
    fetch('https://api.ropsten.x.immutable.com/v2/balances/{owner}').then(res => {
      result = res.json();
    })
  },

  async getERC20Balances() {
    let result;
    fetch('https://api.ropsten.x.immutable.com/v2/balances/{owner}/{address}').then(res => {
      result = res.json();
    })
  },

  async getUserDeposits() {
    let result;
    fetch('https://api.ropsten.x.immutable.com/v1/deposits').then(res => {
      result = res.json();
    })

    // cursor
    // status
    // token_address
    // token_id
    // token_name
    // token_name
    // user address
    // asset_id
  },

  async getAuthentication() {
    // Initialize Link
    let link = new Link(AppConfig.IMXProvider);
    
    let now = Math.floor(Date.now()/1000);
    let result = await link.sign({
      message: `${now}`,
      description: "Game Authentication Request"
    });
    return {...result, timestamp: now};
  }
}