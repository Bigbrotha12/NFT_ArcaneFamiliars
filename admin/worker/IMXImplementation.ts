import { extractNumberEnvVar, extractStringEnvVar } from "./Environment";
import { Familiar, Stage1, Stage2 } from "./Definitions";
import { Constants } from "./Constants";
import { IIMX } from "./IMXInterface";
import { 
  UnsignedMintRequest, MintTokensResponse, 
  ImmutableX, ImmutableXConfiguration, Config 
} from "@imtbl/core-sdk";
import { Signer } from "ethers";

export class IMX_API implements IIMX {
    config: ImmutableXConfiguration;
    client: ImmutableX;
    collection: string;
    beneficiary: string;
    royalty: number;

    constructor() {
        const environment = extractStringEnvVar("ENVIRONMENT");
        this.collection = extractStringEnvVar("COLLECTION");
        this.beneficiary = extractStringEnvVar("BENEFICIARY");
        this.royalty = extractNumberEnvVar("ROYALTY_FEE");

        environment === "production" ? this.config = Config.PRODUCTION : this.config = Config.SANDBOX;
        this.client = new ImmutableX(this.config);
    }
   
    mintToken(signer: Signer, request: UnsignedMintRequest): Promise<MintTokensResponse> {
        return this.client.mint(signer, request);    
    }

    generateMintRequest(familiars: Array<Familiar>): UnsignedMintRequest {
        return this.#formatPayload(
               this.#prepareTokens(
               this.#addBlueprint(familiars)));
    }

    // stage 1 of pipeline
    #addBlueprint(familiars: Array<Familiar>): Array<Stage1> {
        
        return familiars.map((token) => {
            return {
                tokenId: token._id,
                address: token.meta.origin_owner,
                blueprint: [
                    Constants.abilities[token.ability_1],
                    Constants.abilities[token.ability_2],
                    Constants.abilities[token.ability_3],
                    Constants.abilities[token.ability_4]
                ]
            }
        });
    }

    // stage 2 of pipeline
    #prepareTokens(familiars: Array<Stage1>): Array<Stage2> {

        return familiars.map((token) => {
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

    // Stage 3 of pipeline
    #formatPayload(bulk: Array<Stage2>): UnsignedMintRequest {

        return {
          contract_address: this.collection,
          royalties: [
            {
              percentage: this.royalty,
              recipient: this.beneficiary
            }
          ],
          users: bulk
        }
    }
}