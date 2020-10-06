const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');
const { authMessage ,userMessage} = require('../fixtures/messageStatus.json');

const router = express();
const userTransactions = dbFactory('userTransactions');
const adminTransactions = dbFactory('adminTransactions');

const authValidator = validators.authValidator;

router.get('/user', async (req, res) => {
    try {
        const response = await userTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.get('/find/:findType', authValidator.find, async (req, res) => {
    try {
        let result;
        switch (req.params.findType) {
            case 'user':
                result = await userTransactions.find(req.body);
                break;
            case 'admin':
                result = await adminTransactions.find(req.body);
                break;
            default:
                res.status(authMessage.find.Bad_Request.status).json({message: authMessage.find.Bad_Request.message});
                return;
        }
        res.json(result);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.post('/login/:loginType', authValidator.login, async (req, res) => {
    try {
        let result, payload;
        switch (req.params.loginType) {
            case 'user':
                result = await userTransactions.login(req.body);
                payload = { UserID: result.UserID};
                break;
            case 'admin':
                result = await adminTransactions.login(req.body);
                payload = { AdminID: result.AdminID };
                break;
            default:
                res.status(authMessage.login.Bad_Request.status).json({message: authMessage.login.Bad_Request.message});
                return;
        }
        const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: 720 });
        res.json({ userInformation: result, token });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.post('/sign-up/:signupTpye', authValidator.signUp, async (req, res) => {
    try {
        let result;
        switch (req.params.signupTpye) {
            case 'user':
                result = await userTransactions.signup(req.body);
                break;
            case 'admin':
                result = await adminTransactions.signup(req.body);
                break;
            default:
                res.status(authMessage.signUp.Internal_Server_Error.status).json({message: authMessage.signUp.Internal_Server_Error.message});
                return;
        }
        res.json({ message: result.message });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.delete('/delete-my-account',verifyToken,authValidator.deleteMyAccount, async (req, res) => {
    try {
        if (req.decode.UserID == req.body.UserID) {
            const result = await userTransactions.delete(req.body.UserID);
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