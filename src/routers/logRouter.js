const express = require('express');
const { verifyToken } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const logTransactions = dbFactory('logTransactions');

router.get('/adminlog', async (req, res) => {
    try {
        const response = await logTransactions.adminlogList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/adminlog', async (req, res) => {
    try {
        const response = await logTransactions.adminlogInsert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/adminlog',verifyToken, async (req, res) => {
    try {
        const response = await logTransactions.adminlogDelete();
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/servelog', async (req, res) => {
    try {
        const response = await logTransactions.servelogList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/servelog',verifyToken, async (req, res) => {
    try {
        const response = await logTransactions.servelogDelete();
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/databotlog', async (req, res) => {
    try {
        const response = await logTransactions.databotlogList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;