const { validateMessage} = require('../../fixtures/messageStatus.json');
const joi = require('joi');

module.exports = {
    userNews: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(1).max(99999999999).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    add: async (req, res, next) => {
        try {
            await joi.object({
                NewsTitle:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                NewsDescription:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                NewsImage:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                NewsCategoryID:joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            await joi.object({
                NewsID:joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    }
};