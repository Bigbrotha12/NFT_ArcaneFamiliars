From https://docs.x.immutable.com/docs/asset-minting

Every mint request for a user (for one or many assets) will require an auth_signature signed by the contract owner. This ensures that only the entity representing the owner / deployer of the contract will be allowed to authorise mints for users i.e. mint supply is bound by the contract owner's key.

The message digest for the payload is the keccak 256 hash of the stringified mint body payload (without the auth_signature field pre-filled)

{
  "mintBodyPayload": {
    "ether_key":"0x5f333ec73a6a851b8cd7a4a450416a966f9bcceb",
    "tokens": [
      {
        "type": "ERC721",
        "data": {
          "id": "10",
          "blueprint": "{onchain-metadata}",
          "token_address": "0x6De6B04D630A4A41bB223815433b9Ebf0da50F69"
        }
      }
    ],
    "auth_signature": ""
  }
}

Sample signing script (ethers.js)

import * as encUtils from 'enc-utils';
const hash = keccak256(toUtf8Bytes(JSON.stringify(mintBodyPayload)));
const sig = deserializeSignature(await this.signer.signMessage(hash));
return encUtils.addHexPrefix(
  encUtils.padLeft(sig.r.toString(16), 64) +
  encUtils.padLeft(sig.s.toString(16), 64) +
  encUtils.padLeft(sig.recoveryParam?.toString(16) || '', 2),
);