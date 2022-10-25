import ImmutableX from "@imtbl/core-sdk";
import { Familiar } from "./DatabaseInterface";

export interface IMXEndpoint {
    mintToken(
        signer: ImmutableX.EthSigner, 
        request: ImmutableX.UnsignedMintRequest
    ): Promise<ImmutableX.MintTokensResponse>;

    generateMintRequest(familiars: Array<Familiar>): ImmutableX.UnsignedMintRequest;
}