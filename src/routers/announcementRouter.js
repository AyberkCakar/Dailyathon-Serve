const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const announcementTransactions = dbFactory('announcementTransactions');
const announcementValidator = validators.announcementValidator;

router.get('/announcementUserList',verifyToken,announcementValidator.announcementUserList, async (req, res) => {
    try {
        const response = await announcementTransactions.announcementUserList(req.body.UserID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;