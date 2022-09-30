import Accounts from "web3-eth-accounts";
import utils from "web3-utils";

let signer;
export default class MinterController {
    init(privKey) {
        if(signer) return;
        const accounts = new Accounts('');
        signer = function(payload) {
            const hash = utils.keccak256(utils.utf8ToHex(JSON.stringify(payload)));
            return accounts.sign(hash, privKey);
        }
    }
}