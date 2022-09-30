import APIController from "./api-controller.js";
import { Router } from "express";

const router = new Router();

router.get("/v1/:id", APIController.apiGetFamiliarByID);
router.post("/minter", APIController.apiMintFamiliar);

export default router;