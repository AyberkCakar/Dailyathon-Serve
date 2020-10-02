const { validateMessage } = require('../../fixtures/messageStatus.json');
const joi = require('joi');

module.exports = {
    login: async (req, res, next) => {
        try {
            await joi.object({
                Username: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                Password: joi.string().max(99).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },

    signUp: async (req, res, next) => {
        try {
            await joi.object({
                Username: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                Password: joi.string().max(99).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },

    findAdminUsername: async (req, res, next) => {
        try {
            await joi.object({
                Username: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    }
}