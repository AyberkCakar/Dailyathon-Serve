const { mysqlDataContext } = require('../dataContexts');
const { adminMessage } = require ('../../fixtures/messageStatus.json');

module.exports = {
    find: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL AdminFind(?)', [data.AdminID], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject(adminMessage.find.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL AdminLogin(?, ?)', [data.Username, data.Password], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject(adminMessage.login.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    signup: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL AdminSignUp(?,?,?,?,?,?)', [data.Username, data.Password,data.AdminName,data.AdminAuth,data.AdminPosition,data.RegDate], (error, result) => {
                if (!error)
                    if (result[0][0]  != null)
                        resolve(adminMessage.signUp.Ok);
                    else
                        reject(adminMessage.signUp.Internal_Server_Error);
                else
                    reject(error.errno == 1644 ? adminMessage.signUp.Conflict : { status: 500, message: error.message });
            });
        });
    }
};