import { Injectable } from '@angular/core';
import { Link } from '@imtbl/imx-sdk';

@Injectable({
  providedIn: 'root'
})
export class IMXqueryService {

// Mainnet
//const linkAddress = 'https://link.x.immutable.com';
//const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
linkAddress = 'https://link.ropsten.x.immutable.com';
//const apiAddress = 'https://api.ropsten.x.immutable.com/v1';

// Link SDK
link = new Link(this.linkAddress);

async setupAccount() {
  let address, starkPublicKey;
  ({ address, starkPublicKey } = await this.link.setup({}));
  
  localStorage.setItem('WALLET_ADDRESS', address);
  localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);
}

getLink() {
  console.log(this.link);
}

constructor() { }
}
