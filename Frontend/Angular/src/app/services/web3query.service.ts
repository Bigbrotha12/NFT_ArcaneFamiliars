import { Injectable } from '@angular/core';
import Web3  from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3queryService {

  // Alchemy API endpoint
  alchemyHTTP: string = "https://eth-mainnet.g.alchemy.com/v2/MvQogIxaVv54d3SqgzYNSbt-Jyi9yteG";
  alchemyWS: string = "wss://eth-mainnet.g.alchemy.com/v2/MvQogIxaVv54d3SqgzYNSbt-Jyi9yteG";
  
  // Contract ABI
  implementABI: Object;

  // Web3 Provider set-up
  web3: any = new Web3(Web3.givenProvider);
  contractAddress = "0x3e7bFA47D5755b74a28F2f07c0fd4009d887C2b7";
  contractInstance: Object;
  userAccount: string;

  // Metamask Log-In
  async web3LogIn(ethereum: any) {
    
    let accounts: Array<string> = await ethereum.enable();
    this.userAccount = accounts[0];
    this.contractInstance = new this.web3.eth.Contract(this.implementABI, this.contractAddress, {from: accounts[0]});
    
  }

  constructor() { }
}
