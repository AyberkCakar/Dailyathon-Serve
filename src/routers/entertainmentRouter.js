const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const entertainmentTransactions = dbFactory('entertainmentTransactions');
const entertainmentValidator = validators.entertainmentValidator;

router.get('/entertainment', async (req, res) => {
    try {
        const response = await entertainmentTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/city-entertainment',verifyToken,entertainmentValidator.cityEntertainmentList, async (req, res) => {
    try {
        const response = await entertainmentTransactions.cityEntertainmentList(UserCity);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
module.exports = router;