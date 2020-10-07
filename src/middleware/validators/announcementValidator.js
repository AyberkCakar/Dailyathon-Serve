const { validateMessage} = require('../../fixtures/messageStatus.json');
const joi = require('joi');


module.exports = {
    announcementUserList: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(0).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    add: async (req, res, next) => {
        try {
            await joi.object({
                AnnouncementContent:joi.string().min(2).required(),
                AnnouncementStartDate:joi.date().required(),
                AnnouncementDueDate:joi.date().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    announcementAsRead: async (req, res, next) => {
        try {
            await joi.object({
                UserID:joi.number().min(0).max(99999999999).required(),
                AnnouncementID:joi.number().min(0).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    update: async (req, res, next) => {
        try {
            await joi.object({
                AnnouncementID:joi.number().min(0).max(99999999999).required(),
                AnnouncementContent:joi.string().min(2),
                AnnouncementStartDate:joi.date(),
                AnnouncementDueDate:joi.date(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            await joi.object({
                AnnouncementID:joi.number().min(0).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    }
};