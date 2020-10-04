const express = require('express');
const dbFactory = require('../database');

const router = express();
const entertainmentTransactions = dbFactory('entertainmentTransactions');

router.get('/entertainment', async (req, res) => {
    try {
        const response = await entertainmentTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
module.exports = router;