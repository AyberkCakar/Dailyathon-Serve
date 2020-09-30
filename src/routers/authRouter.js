import express from 'express'
import { authValidator } from '../middleware/index'
import dbFactory from '../database'
import { userMessage } from '../fixtures/messageStatus.json'

const router = express();
const userTransactions = dbFactory('userTransactions');

router.post('/login', authValidator.login, async (req, res) => {
    try {
        const result = await userTransactions.login(req.body);
        res.json({ message: result.message });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.post('/sign-up', authValidator.signUp, async (req, res) => {
    try {
        const result = await userTransactions.signup(req.body);
        res.json({ message: result.message });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.delete('/delete-my-account', async (req, res) => {
    try {
        if (req.decode.UserEmail == req.body.UserEmail) {
            const result = await userTransactions.delete(req.body.UserEmail);
            res.status(result.status).json({ message: result.message });
        } else {
            res.status(userMessage.delete.Proxy_Authentication_Required.status).json({ message: userMessage.delete.Proxy_Authentication_Required.message });
        }
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});


module.exports = router;