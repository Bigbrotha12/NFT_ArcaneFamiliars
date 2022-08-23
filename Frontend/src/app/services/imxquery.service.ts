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

constructor() { }
}
