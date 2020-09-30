const { mysqlDataContext } = require('../dataContexts');
import { userMessage } from '../../fixtures/messageStatus.json';

module.exports = {
    login: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserLogin(?, ?)', [data.UserEmail, data.UserPassword], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject(userMessage.login.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    signup: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserSignUp(?,?,?,?,?,?,?)', [data.UserName, data.UserSurname, data.UserEmail, data.UserPassword, data.UserDate, data.UserProfession, data.UserCity], (error, result) => {
                if (!error)
                    if (result[0][0]?.UserID != null)
                        resolve(userMessage.signUp.Ok);
                    else
                        reject(userMessage.signUp.Internal_Server_Error);
                else
                    reject(error.errno == 1644 ? userMessage.signUp.Conflict : { status: 500, message: error.message });
            });
        });
    },
    findUserEmail: (UserEmail) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblUser WHERE UserMail = ?', [UserEmail], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject(userMessage.findUserEmail.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (UserEmail) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblUser WHERE UserMail = ?', [UserEmail], (error, result) => {
                console.log(result);
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(userMessage.delete.Ok);
                    else
                        reject(userMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};