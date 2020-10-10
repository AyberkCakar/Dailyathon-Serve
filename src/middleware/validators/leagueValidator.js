const { validateMessage} = require('../../fixtures/messageStatus.json');
const joi = require('joi');

module.exports = {
    userLeagueList: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(1).max(99999999999).required(),
                LeagueTableName:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    tableList: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(1).max(99999999999).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    find: async (req, res, next) => {
        try {
            await joi.object({
                LeagueID:joi.number().min(1).max(99999999999).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    add: async (req, res, next) => {
        try {
            await joi.object({
                LeagueName:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                SportID:joi.number().min(1).max(99999999999).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    standings: async (req, res, next) => {
        try {
            await joi.object({
                SequenceNo:joi.number().min(1).max(99999999999).required(),
                TeamName:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                TeamLogoUrl:joi.string().required(),
                LeagueTableName:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                LeagueID:joi.number().min(1).max(99999999999).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    update: async (req, res, next) => {
        try {
            await joi.object({
                LeagueID:joi.number().min(1).max(99999999999).required(),
                LeagueName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            await joi.object({
                LeagueID:joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    standingsDelete: async (req, res, next) => {
    try {
        await joi.object({
            LeagueName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
            LeagueTableName:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required()
        }).validateAsync(req.body);
        next();
    } catch (error) {
        res.status(validateMessage.status).send({ message: validateMessage.message });
    }
}
};