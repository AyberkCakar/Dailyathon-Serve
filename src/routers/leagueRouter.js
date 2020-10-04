const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const leagueTransactions = dbFactory('leagueTransactions');
const leagueValidator = validators.sportValidator;

router.get('/league', async (req, res) => {
    try {
        const response = await leagueTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;