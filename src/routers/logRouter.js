const express = require('express');
const { validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const logTransactions = dbFactory('logTransactions');
const logValidator = validators.logValidator;

router.get('/adminlog', async (req, res) => {
    try {
        const response = await logTransactions.adminloglist();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;