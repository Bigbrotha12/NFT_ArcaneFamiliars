import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x3e7bFA47D5755b74a28F2f07c0fd4009d887C2b7";
var contractInstance;
var userAccount;

// ------------- IMX Variables --------------------------------
// Mainnet
//const linkAddress = 'https://link.x.immutable.com';
//const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
const linkAddress = 'https://link.ropsten.x.immutable.com';
const apiAddress = 'https://api.ropsten.x.immutable.com/v1';

// Link SDK
const link = new Link(linkAddress);

// IMX Client
const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });

// ------------- IMX Variables --------------------------------

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      userAccount = accounts[0];
      contractInstance = new web3.eth.Contract(implementABI, contractAddress, {from: accounts[0]});
    
      
      
    });

    $("#check_id").click(setupAccount);
    $("#create_nft").click(createId);
    $("#pay-out").click(callPayOut);

    $("#add-pot").click(callAddPot);
    $("#rm-pot").click(callRemovePot);
    $("#btn-unlock").click(callUnlock);
});

function checkId() {
    var id = $("#tokenId").val();
    console.log(id);
    /*
    contractInstance.methods.ownerOf(id).call().then( (err, res) => {
        console.log(res);
    });
    */

}

// ------------- IMX Account Management Function --------------------------------

async function setupAccount(){
    const {address, starkPublicKey } = await link.setup({});
    console.log(address);
    console.log(starkPublicKey);
    //… save user session data
    localStorage.setItem('WALLET_ADDRESS', address);
    localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);

    //… retrieve user session data
    const address_ = localStorage.getItem('WALLET_ADDRESS');

    // disconnect
    localStorage.removeItem('WALLET_ADDRESS');
}

// ------------- IMX Inventory Management Function --------------------------------

import { ERC721TokenType, ETHTokenType } from '@imtbl/imx-sdk'

const balances = await client.getBalances({ user: address });

// Deposit ETH into IMX
link.deposit({
    type: ETHTokenType.ETH,
    amount: '0.01',
  });

  link.prepareWithdrawal({
    type: ETHTokenType.ETH,
    amount: '0.01', //The amount of the token to withdraw
  });

  link.completeWithdrawal({
    type: ETHTokenType.ETH,
  });

  // View transaction history
link.history({});

// NFT List
const assetsRequest = await client.getAssets({ user: address });

let assetCursor
let assets = []
do {
  let assetRequest = await client.getAssets({ user: address, cursor: assetCursor })
  assets = assets.concat(assetRequest.result)
  assetCursor = assetRequest.cursor
} while (assetCursor);

// Filtering
let assetsRequest = await client.getAssets({
    user: address,
    cursor: assetCursor,
    status: 'imx',
    collection: collectionAddress,
  });

  let assetCursor
let assets = []
do {
  let assetRequest = await client.getAssets({
    user: address,
    cursor: assetCursor,
    status: 'imx',
    collection: collectionAddress,
    sell_orders: true,
  })
  assets = assets.concat(assetRequest.result)
  assetCursor = assetRequest.cursor
} while (assetCursor)

for (let asset of assets) {
  asset.isListed = false
  if (asset.orders?.sell_orders?.length > 0) {
    asset.isListed = true
  }
};

// create sell order

async function sellAsset(asset, priceInEth) {
    let sellParams = {
      amount: priceInEth,
      tokenId: asset.id,
      tokenAddress: asset.token_address,
    }
    //Throws an error if not successful
    await link.sell(sellParams)
  };

  //transfer asset
  async function transferERC721(asset) {
    await link.transfer({
      type: ERC721TokenType.ERC721,
      tokenId: asset.id,
      tokenAddress: asset.token_address,
      to: addressToSendTo,
    })
  }

// ----------------------------------------------------------------

function createId(){
    let blueprint = "0x7b337d3a7b307d";
    contractInstance.methods.mintFor(userAccount,1,blueprint).send();
}

  function callPayOut(){

    contractInstance.methods.getBalance().call().then(function(res){
      contractInstance.methods.payOut(res).send({gas: 1000000}).then(function(){
        $("#message").text("Winnings have been withdrawn");
      });
    });
  }

  function callAddPot(){
    var _balance = $("#pot-increase").val();

    contractInstance.methods.addPot().send({value: web3.utils.toWei(_balance.toString(),"ether"), gas: 1000000}).then(function(){
      alert("Done");
    });
  }

  function callRemovePot(){
    var _balance = $("#pot-decrease").val();

    contractInstance.methods.removePot(web3.utils.toWei(_balance.toString(),"ether")).send({gas: 1000000}).then(function(){
          alert("Done");
    });
  }

  function callUnlock(){
    var _address = $("#locked-address").val();

    contractInstance.methods.unlockPlayer(_address).send({gas: 1000000}).then(function(){
      alert("Done");
    });
  }

/*
  contractInstance.methods.addPerson(age, height, name, gender).send({value: web3.utils.toWei("1", "ether"), gas: 1000000})
    .on('transactionHash', function(hash){
      console.log("tx hash");
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("conf");
    })
    .on('receipt', function(receipt){
      console.log(receipt);
    })
  }

*/