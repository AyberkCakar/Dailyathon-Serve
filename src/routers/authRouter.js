const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken,validators } = require('../middleware');
const dbFactory = require('../database');
const { authMessage ,userMessage} = require('../fixtures/messageStatus.json');

const router = express();
const userTransactions = dbFactory('userTransactions');
const adminTransactions = dbFactory('adminTransactions');
const logTransactions = dbFactory('logTransactions');

const date = new Date();
const authValidator = validators.authValidator;

router.get('/user',verifyToken, async (req, res) => {
    try {
        const response = await userTransactions.list();
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.get('/admin',verifyToken, async (req, res) => {
    try {
        const response = await adminTransactions.list();
        res.json(response);
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/find/:findType', verifyToken,authValidator.find, async (req, res) => {
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
        const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: '7d' });
        res.json({ userInformation: result, token });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/sign-up/:Type', authValidator.signUp, async (req, res) => {
    try {
        let result;
        req.body.RegDate =req.body.RegDate.replace(/T/, ' ').replace(/\..+/, '');
        switch (req.params.Type) {
            case 'user':
                req.body.UserCity=req.body.UserCity.toLowerCase();
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
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,result.message,date);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.post('/forgotpassword', authValidator.forgotpassword, async (req, res) => {
    try {
        const response = await userTransactions.forgotpassword(req.body);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.put('/admin',verifyToken,authValidator.adminUpdate, async (req, res) => {
    try {
        const response = await adminTransactions.update(req.body);
        res.json({message:response.message});
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,response.message,date);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
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
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,response.message,date);
    }
});

router.delete('/user-delete',verifyToken,authValidator.deleteMyAccount, async (req, res) => {
    try {
        const result = await userTransactions.delete(req.body.UserID);
        res.status(result.status).json({ message: result.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,null,result.message,date);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
        await logTransactions.servelogInsert(req.originalUrl,req.method,res.statusCode,res.statusMessage,error.message,result.message,date);
    }
});

router.get('/token-decode', verifyToken, async (req, res) => {
    res.json(req.decode);
});

module.exports = router;