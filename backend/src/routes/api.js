const express = require('express');
const router = express.Router();

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


router.get('/:id', (req, res) => {
    let token_id = req.params.id;
    console.log(token_id);
    res.send(apiResponse);
});

module.exports = router;