import { Familiar } from "./Definitions";
import { EthSigner, UnsignedMintRequest, MintTokensResponse } from "@imtbl/core-sdk";

export interface IIMX {
    mintToken(
        signer: EthSigner, 
        request: UnsignedMintRequest
    ): Promise<MintTokensResponse>;

    generateMintRequest(familiars: Array<Familiar>): UnsignedMintRequest;
}