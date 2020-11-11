const express = require('express');
const { verifyToken } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const apiTransactions = dbFactory('apiTransactions');

router.get('/cripto', verifyToken,async (req, res) => {
    try {
        const response = await apiTransactions.criptoList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/cripto',async (req, res) => {
    try {
        const response = await apiTransactions.criptoInsert(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/cripto',async (req, res) => {
    try {
        const response = await apiTransactions.criptoUpdate(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/stock', verifyToken,async (req, res) => {
    try {
        const response = await apiTransactions.stockList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/stock',async (req, res) => {
    try {
        const response = await apiTransactions.stockInsert();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/stock',async (req, res) => {
    try {
        const response = await apiTransactions.stockUpdate(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/currency', verifyToken,async (req, res) => {
    try {
        const response = await apiTransactions.currencyList();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/currency',async (req, res) => {
    try {
        const response = await apiTransactions.currencyInsert();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/currency',async (req, res) => {
    try {
        const response = await apiTransactions.currencyUpdate(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/pharmacy-list',async (req, res) => {
    try {
        const response = await apiTransactions.pharmacyList(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/pharmacy',async (req, res) => {
    try {
        const response = await apiTransactions.pharmacyInsert(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});


module.exports = router;