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
        const response = await entertainmentTransactions.cityEntertainmentList(req.body.UserCity);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/tag-entertainment',verifyToken,entertainmentValidator.tagEntertainmentList, async (req, res) => {
    try {
        const response = await entertainmentTransactions.tagEntertainmentList(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/entertainment-find',verifyToken,entertainmentValidator.find, async (req, res) => {
    try {
        const response = await entertainmentTransactions.find(req.body.EntertainmentID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/entertainment', verifyToken,entertainmentValidator.add, async (req, res) => {
    try {
        const response = await entertainmentTransactions.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/entertainment', verifyToken,entertainmentValidator.delete, async (req, res) => {
    try {
        const response = await entertainmentTransactions.delete(req.body.EntertainmentID);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;