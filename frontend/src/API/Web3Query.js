import Web3 from 'web3';
import { abi } from '../constants/FamiliarImpl.json';

export const Web3Q = {

  async getETHBalance(provider, address){
    let web3 = new Web3(provider);
    return await web3.eth.getBalance(address);
  },

  async getNFTOwner(provider, tokenId, tokenAddress){
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(abi, tokenAddress);

  }
}