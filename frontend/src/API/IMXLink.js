import { Link } from '@imtbl/imx-sdk';

export const IMXLink = {

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

  
}