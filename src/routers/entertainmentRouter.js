const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const entertainmentTransactions = dbFactory('entertainmentTransactions');
const logTransactions = dbFactory('logTransactions');
const entertainmentValidator = validators.entertainmentValidator;

const date = new Date();

router.get('/entertainment',verifyToken, async (req, res) => {
    try {
        const response = await entertainmentTransactions.list();
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/city-entertainment',verifyToken,entertainmentValidator.cityEntertainmentList, async (req, res) => {
    try {
        const response = await entertainmentTransactions.cityEntertainmentList(req.body.UserCity);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/tag-entertainment',verifyToken,entertainmentValidator.tagEntertainmentList, async (req, res) => {
    try {
        const response = await entertainmentTransactions.tagEntertainmentList(req.body);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/entertainment-find',verifyToken,entertainmentValidator.find, async (req, res) => {
    try {
        const response = await entertainmentTransactions.find(req.body.EntertainmentID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/entertainment',  async (req, res) => {
    try {
        const response = await entertainmentTransactions.insert(req.body);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.delete('/entertainment', verifyToken,entertainmentValidator.delete, async (req, res) => {
    try {
        const response = await entertainmentTransactions.delete(req.body.EntertainmentID);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

module.exports = router;