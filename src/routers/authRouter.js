import express from 'express'
import jwt from 'jsonwebtoken'
import { verifyToken, authValidator ,adminValidator} from '../middleware/index'
import dbFactory from '../database'
import { userMessage } from '../fixtures/messageStatus.json'

const router = express();
const userTransactions = dbFactory('userTransactions');
const adminTransactions = dbFactory('adminTransactions');

router.post('/login/:loginType', authValidator.login,adminValidator.login, async (req, res) => {
    try {
        let result, payload;
        switch (req.params.loginType) {
            case 'user':
                result = await userTransactions.login(req.body);
                payload = { UserEmail: result.UserEmail};
                break;
            case 'admin':
                result = await adminTransactions.login(req.body);
                payload = { Username: result.Username };
                break;
            default:
                res.status(userMessage.login.Bad_Request.status).json({message: userMessage.login.Bad_Request.message});
                return;
        }
        const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: 720 });
        res.json({ userInformation: result, token });
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

router.get('/token-decode', verifyToken, async (req, res) => {
    res.json(req.decode);
});

module.exports = router;