const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const announcementTransactions = dbFactory('announcementTransactions');
const announcementValidator = validators.announcementValidator;

router.get('/announcement', async (req, res) => {
    try {
        const response = await announcementTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/announcement-find' ,verifyToken,announcementValidator.find , async (req, res) => {
    try {
        const response = await announcementTransactions.find(req.body.AnnouncementID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/announcement-statistic' ,verifyToken,announcementValidator.find , async (req, res) => {
    try {
        const response = await announcementTransactions.statistic(req.body.AnnouncementID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/announcementUserList',verifyToken,announcementValidator.announcementUserList, async (req, res) => {
    try {
        const response = await announcementTransactions.announcementUserList(req.body.UserID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/announcement',verifyToken,announcementValidator.add, async (req, res) => {
    try {
        const response = await announcementTransactions.insert(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/announcement-user',verifyToken,announcementValidator.announcementAsRead, async (req, res) => {
    try {
        const response = await announcementTransactions.announcementAsRead(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/announcement',verifyToken,announcementValidator.update, async (req, res) => {
    try {
        const response = await announcementTransactions.update(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/announcement',verifyToken,announcementValidator.delete, async (req, res) => {
    try {
        const response = await announcementTransactions.delete(req.body.AnnouncementID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;