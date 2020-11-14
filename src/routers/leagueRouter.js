const express = require('express');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');

const router = express();
const leagueTransactions = dbFactory('leagueTransactions');
const leagueValidator = validators.leagueValidator;

router.get('/league', async (req, res) => {
    try {
        const response = await leagueTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/league-table',verifyToken,leagueValidator.tableList, async (req, res) => {
    try {
        const response = await leagueTransactions.tableList(req.body.UserID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/user-league', verifyToken,leagueValidator.userLeagueList,async (req, res) => {
    try {
        const response = await leagueTransactions.userLeagueList(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/league-find', verifyToken,leagueValidator.find,async (req, res) => {
    try {
        const response = await leagueTransactions.find(req.body.LeagueID);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/standings-find', verifyToken,async (req, res) => {
    try {
        const response = await leagueTransactions.standingsList(req.body);
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/league', verifyToken,leagueValidator.add, async (req, res) => {
    try {
        const response = await leagueTransactions.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/league-standings', async (req, res) => {
    try {
        const response = await leagueTransactions.standingsInsert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/league', verifyToken,leagueValidator.update, async (req, res) => {
    try {
        const response = await leagueTransactions.update(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.put('/league-standings',  async (req, res) => {
    try {
        const response = await leagueTransactions.standingsUpdate(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.delete('/league', verifyToken, leagueValidator.delete, async (req, res) => {
    try {
        const response = await leagueTransactions.delete(req.body.LeagueID);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;