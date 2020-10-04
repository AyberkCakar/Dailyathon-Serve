const { validateMessage} = require('../../fixtures/messageStatus.json');
const joi = require('joi');

module.exports = {
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
    }
};