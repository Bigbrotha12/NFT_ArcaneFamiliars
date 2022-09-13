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

## Immutable Contract Addresses

{
    Environment/Network: Public Test (Ropsten)
    Core (StarkEx Bridge): [0x4527be8f31e2ebfbef4fcaddb5a17447b27d2aef]
    User Registration Contract: [0x6c21ec8de44ae44d0992ec3e2d9f1abb6207d864]
},
{
    Environment/Network: Sandbox (Goerli)
    Core (StarkEx Bridge): [0x7917edb51ecd6cdb3f9854c3cc593f33de10c623]
    User Registration Contract: [0x1c97ada273c9a52253f463042f29117090cd7d83]
},
{
    Environment/Network: Production (Mainnet)
    Core (StarkEx Bridge): [0x5fdcca53617f4d2b9134b29090c87d01058e27e9]
    User Registration Contract: [0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c]
}

Minting Request to IMX Client

const result = await minter.mintV2([
  {
      "contractAddress": "0xc6185055ea9891d5d9020c927ff65229baebdef2",
      "royalties": [ // global fees
          {
              "recipient": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
              "percentage": 2.5
          }
      ],
      "users": [
          {
              "etherKey": "0xc3ec7590d5970867ebd17bbe8397500b6ae5f690",
              "tokens": [
                  {
                      // ERC-721
                      "id": "1",
                      "blueprint": "my-on-chain-metadata",
                      "royalties": [ // override global fees on a per-token basis
                          {
                              "recipient": "0xc3ec7590d5970867ebd17bbe8397500b6ae5f690",
                              "percentage": 2.5
                          }
                      ],
                  }
              ]
          },
          {
              "etherKey": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
              "tokens": [
                  {
                      // ERC-721
                      "id": "",
                      "blueprint": ""
                  }
              ]
          },
          ...
      ]
  }
]);