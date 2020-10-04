const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const sportTransactions = dbFactory('sportTransactions');
const sportValidator = validators.sportValidator;

router.get('/sport', async (req, res) => {
    try {
        const response = await sportTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;