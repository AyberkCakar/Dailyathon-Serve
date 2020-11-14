const { validateMessage} = require('../../fixtures/messageStatus.json');
const joi = require('joi');

module.exports = {
    userTag: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    find: async (req, res, next) => {
        try {
            await joi.object({
                TagID:joi.number().min(1).max(99999999999).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    add: async (req, res, next) => {
        try {
            await joi.object({
                TagName:joi.string().min(2).required(),
                CategoryID:joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    tagSelect: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(1).max(99999999999).required(),
                TagName:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                RegDate: joi.date().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    update: async (req, res, next) => {
        try {
            await joi.object({
                TagID:joi.number().min(1).max(99999999999).required(),
                TagName:joi.string().min(3).required(),
                CategoryID:joi.number().min(1).max(99999999999)
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            await joi.object({
                TagID:joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    tagDelete: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(1).max(99999999999).required(),
                TagName:joi.string().min(2).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    }
};