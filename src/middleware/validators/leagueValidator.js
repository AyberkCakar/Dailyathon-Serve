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
                LeagueCountry:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                LeagueUrl:joi.string().required(),
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
                SequenceNo:joi.number().min(0).max(99999999999).required(),
                TeamName:joi.string().required(),
                TeamLogoUrl:joi.string().required(),
                O:joi.number(),
                G:joi.number(),
                B:joi.number(),
                M:joi.number(),
                A:joi.number(),
                Y:joi.number(),
                AV:joi.number(),
                P:joi.number(),
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
                LeagueCountry:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                LeagueUrl:joi.string().required(),
                SportID:joi.number().min(1).max(99999999999).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    standingsUpdate: async (req, res, next) => {
        try {
            await joi.object({
                SequenceNo:joi.number().min(0).max(99999999999).required(),
                TeamName:joi.string().required(),
                TeamLogoUrl:joi.string().required(),
                O:joi.number(),
                G:joi.number(),
                B:joi.number(),
                M:joi.number(),
                A:joi.number(),
                Y:joi.number(),
                AV:joi.number(),
                P:joi.number(),
                LeagueTableName:joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                LeagueID:joi.number().min(1).max(99999999999).required()
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
    }
};