import { Ability, Familiar, Query } from "./Definitions";
import { IDatabase } from "./DatabaseInterface";

export class FamiliarController {
    DB: IDatabase

    constructor(cachedDB: IDatabase) {
        this.DB = cachedDB;
    }

    async getMetadata(id: number): Promise<Familiar | undefined> {
        const metadata: Familiar | undefined = await this.DB.getTokenMetadata(id);
        if(metadata === undefined) {
            console.error("Token data not found");
            return undefined;
        }
        return metadata;
    }

    async getFamiliar(query: Query): Promise<Familiar | undefined> {
        const familiar: Familiar | undefined = await this.DB.getFamiliar(query);
        if(familiar === undefined) {
            console.error("No such familiar");
            return undefined;
        }
        return familiar;
    }

    async getAbility(query: Query): Promise<Ability | undefined> {
        const ability: Ability | undefined = await this.DB.getAbility(query);
        if(ability === undefined) {
            console.error("No such familiar");
            return undefined;
        }
        return ability;
    }
}