import Accounts from "web3-eth-accounts";
import utils from "web3-utils";

let signer;
export default class MinterController {
    static init(privKey) {
        if(signer) return;
        const accounts = new Accounts('');
        signer = function(payload) {
            const hash = utils.keccak256(utils.utf8ToHex(JSON.stringify(payload)));
            return accounts.sign(hash, privKey);
        }
    }

    static setPayload(userAddress, tokenId, vars) {
        let payload = 
        {
            contract_address: "0x2ef8390d0ed43fd98b785ae414bb5dd5364d621b",
            royalties: [
              {
                percentage: 5,
                recipient: "0x5C3A548eF38e578EE4310b36D2Bc739bA7d58f7f"
              }
            ],
            users: [
              {
                tokens: [
                  {
                    blueprint: `{${vars[0]}}:{${vars[1]+vars[2]+vars[3]+vars[4]}}`,
                    id: tokenId,
                  }
                ],
                user: userAddress
              }
            ]
        }
        let auth = signer(payload);
        payload.auth_signature = auth.signature;
        return payload;
    }
}