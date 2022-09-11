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
        result = await link.setup({});
        console.log(result);
        
        return result;
    }
}