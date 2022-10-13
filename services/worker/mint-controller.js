import ethers from "ethers";
import abilities from "./abilityTable.js"

let signer, collection, beneficiary, royalty;
export default class MinterController {
    static async init(privKey, collectionAddr, beneficiaryAddr, royaltyFee) {
        if(signer) return;
        const wallet = new ethers.Wallet(privKey);
        signer = function(payload) {
            const message = ethers.utils.keccak256((JSON.stringify(payload)));
            return wallet.signMessage(message);
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

    static async signPayload(payload) {
      let auth = await signer(payload);
      payload.auth_signature = auth.signature;
      return [payload];
    }
}