const express = require('express');
const router = express.Router();

router.get('/:token_id', (req, res) => {
    res.send({ "token id": req.params.token_id });
});

module.exports = router;