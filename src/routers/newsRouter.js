const express = require('express');
const dbFactory = require('../database');

const router = express();
const newsTransactions = dbFactory('newsTransactions');

router.get('/news-category', async (req, res) => {
    try {
        const response = await newsTransactions.newsCategoryList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
module.exports = router;