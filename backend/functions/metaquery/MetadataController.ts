import { Ability, Familiar, Query } from "../shared/Definitions";
import IDatabase from "../shared/IDatabase";

export default class MetadataController {
    DB: IDatabase

    constructor(cachedDB: IDatabase) {
        this.DB = cachedDB;
    }

    async getMetadata(id: number): Promise<Familiar | null> {

        try {
            const metadata: Familiar = await this.DB.getTokenMetadata(id);
            return metadata;
        } catch (error) {
            console.error("Token data not found");
            return null;
        }
    }

    async getFamiliar(query: Query): Promise<Familiar | null> {

        try {
            const familiar: Familiar = await this.DB.getFamiliar(query);
            return familiar;
        } catch (error) {
            console.error("Familiar not found");
            return null;
        }
    }

    async getAbility(query: Query): Promise<Ability | null> {

        try {
            const ability: Ability | undefined = await this.DB.getAbility(query);
            return ability;
        } catch (error) {
            console.error("No such familiar");
            return null;
        }
    }
}