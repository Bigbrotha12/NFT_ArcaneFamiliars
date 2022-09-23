const express = require('express');
const router = express.Router();

router.get("/mint", (req, res) => {
    res.send("This is to mint");
})

module.exports = router;