import FamiliarsDAO from "../dao/familiarsDAO.js";
import UsersDAO from "../dao/usersDAO.js";
import {calculateTiers} from "../lib/utils.js";

export default class APIController {
    static async apiGetFamiliarByID(req, res, next) {
        const token_id = Number(req.params.id);
        const familiar = await MintRegister.getFamiliarByID(token_id);
        if(familiar) {
            res.status(200).json(familiar);
        } else {
            res.status(500).send("Internal Error");
        }
    }

    static async apiMintFamiliar(req, res, next) {
        let user = await UsersDAO.getUser(req.body.eth_address);
        let {success, error} = validateRequest(req.body, user);
        if(success) {
            let familiar = generateNextFamiliar(req.body.eth_address);
            await FamiliarsDAO.registerFamiliar(familiar, req.body.eth_address);
            res.status(200).send("Minting in progress!")
        } else {
            console.log(req.body.eth_address, error.message); 
            res.status(400).send("Bad request");
        }
        await UsersDAO.updateUserData(success, error);
    }
    
    static async generateNextFamiliar(userAddress) {
        let nftMinted = await UsersDAO.getUserTotalMints(userAddress);
        let tiers = calculateTiers(nftMinted);
        let availableTemplates = FamiliarsDAO.getTemplatesByTier(tiers);
        let randomNum = generateRandom(userAddress, nftMinted);
        let chosenOne = randomNum % availableTemplates.length;
        return availableTemplates[chosenOne];
    }
}