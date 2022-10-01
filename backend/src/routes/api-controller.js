import MintRegister from "../dao/mintRegisterDAO.js";
import Users from "../dao/usersDAO.js";
import IMXDAO from "../dao/imxDAO.js";
import MinterController from "./mint-controller.js";
import { validate } from "../utils/utils.js";

export default class APIController {
    static async apiGetFamiliarByID(req, res, next) {
        const token_id = req.params.id;
        const familiar = await MintRegister.getFamiliarByID(token_id);
        if(familiar) {
            res.status(200).json(familiar);
        } else {
            res.status(500).send("Internal Error");
        }
    }

    static async apiMintFamiliar(req, res, next) {
        if(validate(req)) {
            const token_params = req.body;
            const { result } = await MintRegister.registerFamiliar(token_params);
            if (result instanceof Error) {
                res.status(500).json({error: error});
            } else {
                let resultTwo = await Users.updateUser(token_params.owner);
                if (resultTwo.result instanceof Error) {
                    res.status(500).json({message: result});
                } else {
                    let signedRequest = MinterController.setPayload(token_params);
                    let mintResponse = await IMXDAO.mintToken(signedRequest, { restries: 3, backOff: 200 });
                    res.status(200).json({mintResponse});
                }
            }
        } else {
            res.status(401).json({message: "Bad Mint Request"});
        }
    }
}

const apiResponse =
    {
        "name": "White Dog",
        "asset_id": 1,
        "type": "Fire",
        "HP": 300,
        "MP": 150,
        "attack": 45,
        "defense": 220,
        "speed": 80,
        "arcane": 120,
        "ability1": "Brave",
        "ability2": "Sturdy",
        "ability3": null,
        "ability4": null,
        "rarity": "Common"
}