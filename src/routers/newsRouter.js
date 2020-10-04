const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const newsTransactions = dbFactory('newsTransactions');
const newsValidator = validators.newsValidator;

router.get('/news-category', async (req, res) => {
    try {
        const response = await newsTransactions.newsCategoryList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/news', async (req, res) => {
    try {
        const response = await newsTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/news', verifyToken,newsValidator.add, async (req, res) => {
    try {
        const response = await newsValidator.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
module.exports = router;