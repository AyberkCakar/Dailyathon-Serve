const express = require('express');
const { verifyToken } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const apiTransactions = dbFactory('apiTransactions');

router.get('/cripto', verifyToken,async (req, res) => {
    try {
        const response = await apiTransactions.criptoList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;