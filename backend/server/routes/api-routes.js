import APIController from "./api-controller.js";
import { Router } from "express";

const router = new Router();

router.get("/v1/familiar/:id", APIController.apiGetFamiliarByID);
//router.get("/v1/user/:address", APIController.apiGetUser);
router.post("/v1/mint", APIController.apiMintFamiliar);

export default router;

/**
 * -------------------------------------------------------
 * Get NFT Metadata
 * GET - https://api.domain.com/v1/{token_id} 
 * Request:
 *  Path parameter
 *      token_id: string    ID of NFT token to query
 *  Headers: null    
 *  Body: null
 * Response:
 *  Status
 *      200
 *  Body: JSON
 *      { ...NFT_Metadata }
 * -------------------------------------------------------
 * Mint new NFT
 * POST - https://api.domain.com/v1/mint
 * Request:
 *  Headers: null    
 *  Body: JSON
 *      { 
 *          game_code: string       Game code-hash
 *          game_data: string       Game mint data
 *          eth_address: string     User eth address
 *          eth_signature: string   User eth signature   
 *      }
 */