const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const categoryTransactions = dbFactory('categoryTransactions');
const categoryValidator = validators.categoryValidator;
const logTransactions = dbFactory('logTransactions');

const date = new Date();

router.get('/category',verifyToken, async (req, res) => {
    try {
        const response = await categoryTransactions.list();
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/category-find', verifyToken,categoryValidator.find, async (req, res) => {
    try {
        const response = await categoryTransactions.find(req.body.CategoryID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/category', verifyToken,categoryValidator.add, async (req, res) => {
    try {
        const response = await categoryTransactions.insert(req.body);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.put('/category', verifyToken,categoryValidator.update, async (req, res) => {
    try {
        const response = await categoryTransactions.update(req.body);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.delete('/category', verifyToken, categoryValidator.delete, async (req, res) => {
    try {
        const response = await categoryTransactions.delete(req.body.CategoryID);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

module.exports = router;
