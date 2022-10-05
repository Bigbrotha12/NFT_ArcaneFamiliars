import Accounts from "web3-eth-accounts";
import utils from "web3-utils";
import abilities from "./abilityTable.js"

let signer, collection, beneficiary, royalty;
export default class MinterController {
    static init(privKey, collectionAddr, beneficiaryAddr, royaltyFee) {
        if(signer) return;
        const accounts = new Accounts('');
        signer = function(payload) {
            const message = utils.keccak256((JSON.stringify(payload)));
            return accounts.sign(message, privKey);
        }
        collection = collectionAddr;
        beneficiary = beneficiaryAddr;
        royalty = Number(royaltyFee);
    }

    static formatPayload(bulk) {
        let payload = 
        {
          auth_signature: "",
          contract_address: collection,
          royalties: [
            {
              percentage: royalty,
              recipient: beneficiary
            }
          ],
          users: bulk
        }
        return payload;
    }

    static prepareBulkMint(tokensArr) {
      return tokensArr.map((token) => {
        return {
          tokens:
            [{
              blueprint: `${token.blueprint[0]+token.blueprint[1]+token.blueprint[2]+token.blueprint[3]}`,
              id: `${token.tokenId}`,
            }],
          user: token.address
        }
      });
    }

    static formatTokenArray(tokens) {
      return tokens.map(token => {
        return {
          tokenId: token._id,
          address: token.meta.origin_owner,
          blueprint: [
            abilities[token.ability_1],
            abilities[token.ability_2],
            abilities[token.ability_3],
            abilities[token.ability_4]
          ]
        }
      });
    }

    static signPayload(payload) {
      let auth = signer(payload);
      payload.auth_signature = auth.signature;
      return [payload];
    }
}