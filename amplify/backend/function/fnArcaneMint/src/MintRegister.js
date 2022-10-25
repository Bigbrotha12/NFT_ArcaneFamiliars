"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintRegister = void 0;
const RegisterController_1 = require("./RegisterController");
/**
 * Core business logic for processing mint requests and handling
 * user response.
 * @param event HTTP mint request received from user
 * @returns HTTP response to user request
 */
async function MintRegister(event, cachedDB) {
    let response;
    const controller = new RegisterController_1.RegisterController(cachedDB);
    const user = await controller.getUserData(event.body.eth_address);
    if (user === undefined) {
        console.error("No such user registered");
        console.info("Invalid request from %s", event.body.eth_address);
        response = { statusCode: 400, status: "Bad Request", error: { message: "No such user registered" } };
        return response;
    }
    const validation = controller.verifyRequest(event, user);
    if (typeof validation === 'string') {
        console.error("Failed validation: %s", validation);
        console.info("Invalid request from %s", event.body.eth_address);
        response = { statusCode: 403, status: "Forbidden", error: { message: "Data verification failed" } };
        return response;
    }
    const familiar = await controller.generateNextFamiliar(user);
    if (familiar === undefined) {
        console.error("Failed to generate familiar");
        console.info("Valid but failed request from %s", event.body.eth_address);
        response = { statusCode: 500, status: "Internal Server Error", error: { message: "NFT generation failed" } };
        return response;
    }
    const result = await controller.registerFamiliar(familiar, user);
    if (result === undefined) {
        console.error("Failed to register familiar");
        console.info("Valid but failed request from %s", event.body.eth_address);
        response = { statusCode: 500, status: "Internal Server Error", error: { message: "NFT registration failed" } };
        return response;
    }
    if (result) {
        response = { statusCode: 200, status: "OK", body: familiar };
    }
    return response = { statusCode: 500, status: "Internal Server Error", error: { message: "Unknown Error" } };
}
exports.MintRegister = MintRegister;
