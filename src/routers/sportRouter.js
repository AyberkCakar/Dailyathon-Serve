const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const sportTransactions = dbFactory('sportTransactions');
const logTransactions = dbFactory('logTransactions');
const sportValidator = validators.sportValidator;

const date = new Date();

router.get('/sport',verifyToken, async (req, res) => {
    try {
        const response = await sportTransactions.list();
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/sport-find' , verifyToken,sportValidator.find , async (req, res) => {
    try {
        const response = await sportTransactions.find(req.body.SportID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/sport', verifyToken,sportValidator.add, async (req, res) => {
    try {
        const response = await sportTransactions.insert(req.body);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.put('/sport', verifyToken,sportValidator.update, async (req, res) => {
    try {
        const response = await sportTransactions.update(req.body);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.delete('/sport', verifyToken, sportValidator.delete, async (req, res) => {
    try {
        const response = await sportTransactions.delete(req.body.SportID);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

module.exports = router;