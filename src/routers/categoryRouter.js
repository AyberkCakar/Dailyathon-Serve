const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const categoryTransactions = dbFactory('categoryTransactions');
const categoryValidator = validators.categoryValidator;

router.get('/category', async (req, res) => {
    try {
        const response = await categoryTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/category-find', verifyToken,categoryValidator.find, async (req, res) => {
    try {
        const response = await categoryTransactions.find(req.body.CategoryID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/category', verifyToken,categoryValidator.add, async (req, res) => {
    try {
        const response = await categoryTransactions.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/category', verifyToken,categoryValidator.update, async (req, res) => {
    try {
        const response = await categoryTransactions.update(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/category', verifyToken, categoryValidator.delete, async (req, res) => {
    try {
        const response = await categoryTransactions.delete(req.body.CategoryID);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;
