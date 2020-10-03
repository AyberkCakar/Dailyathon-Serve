const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const tagTransactions = dbFactory('tagTransactions');
const tagValidator = validators.tagValidator;

router.get('/tag', async (req, res) => {
    try {
        const response = await tagTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;