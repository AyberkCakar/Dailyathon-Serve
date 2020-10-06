const { validateMessage,userMessage,adminMessage } = require('../../fixtures/messageStatus.json');
const joi = require('joi');

module.exports = {
    login: async (req, res, next) => {
        try {
            const Type = req.params;
            switch (Type.loginType) {
                case 'user':
                    await joi.object({
                        UserEmail: joi.string().email().required(),
                        UserPassword: joi.string().max(99).required()
                    }).validateAsync(req.body);
                    break;
                case 'admin':
                    await joi.object({
                        Username: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                        Password: joi.string().max(99).required()
                    }).validateAsync(req.body);
                    break;
                default:
                    res.status(userMessage.login.Internal_Server_Error.status).json({message: userMessage.login.Internal_Server_Error.message});
                    return;
            }
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },

    signUp: async (req, res, next) => {
        try {
            const Type = req.params;
            switch (Type.signupType) {
                case 'user':
                    await joi.object({
                        UserName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                        UserSurname:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                        UserEmail: joi.string().email().required(),
                        UserPassword: joi.string().max(99).required(),
                        UserDate: joi.date().required(),
                        UserProfession: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                        UserCity: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                    }).validateAsync(req.body);
                    break;
                case 'admin':
                    await joi.object({
                        Username: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                        Password: joi.string().max(99).required()
                    }).validateAsync(req.body);
                    break;
                default:
                    res.status(adminMessage.signUp.Internal_Server_Error.status).json({message: adminMessage.signUp.Internal_Server_Error.message});
                    return;
            }
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
    },

    deleteMyAccount: async (req, res, next) => {
        try {
            await joi.object({
                UserEmail: joi.string().email().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    }
};