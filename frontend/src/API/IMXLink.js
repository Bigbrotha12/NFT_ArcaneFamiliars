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

    async deposit(provider, type, tokenId, tokenAddress) {
        let link = new Link(provider);
        let result;
        try {
            result = await link.deposit({
                "type": type,
                "tokenId": tokenId,
                "tokenAddress": tokenAddress
            });
        } catch(error) {
            console.error(error);
        }
        return result;
    },

    async prepareWithdraw(provider, type, tokenId, tokenAddress){
        let link = new Link(provider);
        let result;
        try{
        let result = await link.prepareWithdrawal({
            "type": type,
            "tokenId": tokenId,
            "tokenAddress": tokenAddress
        })} catch(error){
        console.error(error)
        }
        return result;
    },

    async completeWithdraw(provider, type, tokenId, tokenAddress){
        let link = new Link(provider);
        let result;
        try{
        let result = await link.completeWithdrawal({
            "type": type,
            "tokenId": tokenId,
            "tokenAddress": tokenAddress
        })} catch(error){
        console.error(error)
        }
        return result;
    },
}