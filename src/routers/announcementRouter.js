const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const announcementTransactions = dbFactory('announcementTransactions');
const logTransactions = dbFactory('logTransactions');

const announcementValidator = validators.announcementValidator;
const date = new Date();

router.get('/announcement', verifyToken,async (req, res) => {
    try {
        const response = await announcementTransactions.list();
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/announcement-find' ,verifyToken,announcementValidator.find , async (req, res) => {
    try {
        const response = await announcementTransactions.find(req.body.AnnouncementID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/announcement-statistic' ,verifyToken,announcementValidator.find , async (req, res) => {
    try {
        const response = await announcementTransactions.statistic(req.body.AnnouncementID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/announcement-user-list',verifyToken,announcementValidator.announcementUserList, async (req, res) => {
    try {
        const response = await announcementTransactions.announcementUserList(req.body.UserID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/announcement-read-user-list',verifyToken,announcementValidator.announcementUserList, async (req, res) => {
    try {
        const response = await announcementTransactions.announcementReadUserList(req.body.UserID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/announcement',verifyToken,announcementValidator.add, async (req, res) => {
    try {
        req.body.AnnouncementDate =req.body.AnnouncementDate.replace(/T/, ' ').replace(/\..+/, '');
        const response = await announcementTransactions.insert(req.body);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/announcement-user',verifyToken,announcementValidator.announcementAsRead, async (req, res) => {
    try {
        req.body.RegDate=req.body.RegDate.replace(/T/, ' ').replace(/\..+/, '');
        const response = await announcementTransactions.announcementAsRead(req.body);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.put('/announcement',verifyToken,announcementValidator.update, async (req, res) => {
    try {
        req.body.AnnouncementDate =req.body.AnnouncementDate.replace(/T/, ' ').replace(/\..+/, '');
        const response = await announcementTransactions.update(req.body);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.delete('/announcement',verifyToken,announcementValidator.delete, async (req, res) => {
    try {
        const response = await announcementTransactions.delete(req.body.AnnouncementID);
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

module.exports = router;