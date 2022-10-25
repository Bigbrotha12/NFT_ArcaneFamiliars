"use strict";
import chai from 'chai';
import { describe, it } from "mocha";
import { Database } from "./DatabaseImplementation";
//import { IMX_API } from "./IMXImplementation";
//import { MongoClient } from "mongodb";

//let assert = chai.assert;
let expect = chai.expect;
//let should = chai.should;
describe("Database Implementation", () => {
    // init(): Promise<void>,
    // getFamiliarByID(tokenId: number): Promise<Familiar | undefined>,
    // getPendingMints(): Promise<Array<Familiar> | undefined>,
    // getMintStatus(tokenId: number): Promise<string | undefined>,
    // updatePendingMints(tokens: Array<Familiar>): Promise<boolean | undefined>

    it("should initialize database connection", async () => {
        let DB = new Database();
        await DB.init();
        expect(DB.client).to.not.equal(undefined, "Error: Database failed to initialized");
    });

    it("should return one Familiar document for given ID", async () => {

    });

    it("should return array of all pending mints", async() => {

    });

    it("should return the minting status of a token ID", async () => {

    });

    it("should update the minting status of a pending token", async() => {

    });
});

describe("IMX Implementation", () => {

});

describe("Mint Controller", () => {

})


