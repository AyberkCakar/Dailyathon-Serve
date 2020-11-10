const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const surveyTransactions = dbFactory('surveyTransactions');
const surveyValidator = validators.surveyValidator;

router.get('/survey', async (req, res) => {
    try {
        const response = await surveyTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/survey-user-list',verifyToken,surveyValidator.surveyUserList, async (req, res) => {
    try {
        const response = await surveyTransactions.surveyUserList(req.body.UserID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/survey-read-user-list',verifyToken,surveyValidator.surveyUserList, async (req, res) => {
    try {
        const response = await surveyTransactions.surveyReadUserList(req.body.UserID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/survey-find',verifyToken,surveyValidator.find, async (req, res) => {
    try {
        const response = await surveyTransactions.find(req.body.SurveyListID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/survey-statistic',verifyToken,surveyValidator.find, async (req, res) => {
    try {
        const response = await surveyTransactions.statistic(req.body.SurveyListID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/survey-data',verifyToken,surveyValidator.find, async (req, res) => {
    try {
        const response = await surveyTransactions.surveyData(req.body.SurveyListID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/survey', verifyToken,surveyValidator.add,async (req, res) => {
    try {
        const response = await surveyTransactions.insert(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/survey-read', verifyToken,surveyValidator.surveyAsRead,async (req, res) => {
    try {
        const response = await surveyTransactions.surveyAsRead(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/survey', verifyToken,surveyValidator.update,async (req, res) => {
    try {
        const response = await surveyTransactions.update(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/survey', verifyToken,surveyValidator.delete,async (req, res) => {
    try {
        const response = await surveyTransactions.delete(req.body.SurveyListID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
module.exports = router;