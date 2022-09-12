import Web3 from 'web3';
import { Alchemy, Network } from 'alchemy-sdk';
import { abi } from '../constants/FamiliarLogic.json';

export const NFTQuery = {

  // Contract methods
  // getTokenBlueprint(uint256 _tokenId)
  // tokenURI(uint256 _tokenId)
  // balanceOf(address owner)
  // ownerOf(uint256 tokenId)

  async getETHBalance(provider, address){
    let web3 = new Web3(provider);
    return await web3.eth.getBalance(address);
  },

  async NFTBalance(provider, userAddress, tokenAddress){
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(abi, tokenAddress);
    return await contract.methods.balanceOf(userAddress);
  },

  async getNFTOwner(provider, tokenId, tokenAddress){
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(abi, tokenAddress);
    return await contract.methods.ownerOf(tokenId);
  },

  async getUserNFTs(key, userAddress, tokenAddress){
    let config = {
      apiKey: key,
      network: Network.ETH_GOERLI
    };
    let alchemy = new Alchemy(config);
    return await alchemy.nft.getNftsForOwner(
      userAddress, 
      {withMetadata: false, contractAddresses: [tokenAddress]});
  },

  async getTokenURI(provider, tokenId, tokenAddress){
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(abi, tokenAddress);
    return await contract.methods.tokenURI(tokenId);
  },

  async getBlueprint(provider, tokenId, tokenAddress){
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(abi, tokenAddress);
    return await contract.methods.getTokenBlueprint(tokenId);
  }
}