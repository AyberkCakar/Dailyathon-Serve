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

router.post('/sport', verifyToken,sportValidator.add, async (req, res) => {
    try {
        const response = await sportTransactions.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/sport', verifyToken,sportValidator.update, async (req, res) => {
    try {
        const response = await sportTransactions.update(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;