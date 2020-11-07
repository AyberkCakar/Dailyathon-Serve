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

router.post('/tag-statistic', verifyToken, async (req, res) => {
    try {
        const response = await statisticTransactions.tagStatistic(req.body.selectID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/category-statistic', verifyToken, async (req, res) => {
    try {
        const response = await statisticTransactions.categoryStatistic(req.body.CategoryID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/age-statistic', verifyToken, async (req, res) => {
    try {
        const response = await statisticTransactions.ageStatistic();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;