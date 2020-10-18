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
    find: async (req, res, next) => {
        try {
            await joi.object({
                AnnouncementID:joi.number().min(0).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    add: async (req, res, next) => {
        try {
            await joi.object({
                AnnouncementTitle:joi.string().min(2).required(),
                AnnouncementContent:joi.string().min(2).required(),
                AnnouncementDate:joi.date().required(),
                Visible: joi.boolean().required()
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
                AnnouncementID:joi.number().min(0).max(99999999999).required(),
                AnnouncementTitle:joi.string().min(2).required(),
                AnnouncementContent:joi.string().min(2),
                AnnouncementDate:joi.date(),
                Visible: joi.boolean().required()
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