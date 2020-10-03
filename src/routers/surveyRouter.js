const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const surveyTransactions = dbFactory('surveyTransactions');
const surveyValidator = validators.surveyValidator;

router.get('/surveyUserList',verifyToken,surveyValidator.surveyUserList, async (req, res) => {
    try {
        const response = await surveyTransactions.surveyUserList(req.body.UserID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;