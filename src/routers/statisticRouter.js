const express = require('express');
const { verifyToken } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const statisticTransactions = dbFactory('statisticTransactions');

router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const response = await statisticTransactions.dashboard();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/thisweektag', verifyToken, async (req, res) => {
    try {
        const response = await statisticTransactions.thisweektag();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;