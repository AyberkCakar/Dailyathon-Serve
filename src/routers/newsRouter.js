const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const newsTransactions = dbFactory('newsTransactions');
const newsValidator = validators.newsValidator;

router.get('/news', verifyToken, async (req, res) => {
    try {
        const response = await newsTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/user-news',verifyToken,newsValidator.userNews, async (req, res) => {
    try {
        const response = await newsTransactions.userNewsList(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/news-find',verifyToken,newsValidator.find, async (req, res) => {
    try {
        const response = await newsTransactions.find(req.body.NewsID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/news',newsValidator.add, async (req, res) => {
    try {
        const response = await newsTransactions.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/news', verifyToken, newsValidator.delete, async (req, res) => {
    try {
        const response = await newsTransactions.delete(req.body.NewsID);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
module.exports = router;