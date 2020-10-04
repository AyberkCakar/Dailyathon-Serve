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

router.post('/league', verifyToken,leagueValidator.add, async (req, res) => {
    try {
        const response = await leagueTransactions.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/league', verifyToken,leagueValidator.update, async (req, res) => {
    try {
        const response = await leagueTransactions.update(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;