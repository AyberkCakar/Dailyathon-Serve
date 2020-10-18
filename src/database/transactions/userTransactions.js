const { mysqlDataContext } = require('../dataContexts');
const { userMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT UserID,UserName,UserSurname,UserMail,UserDate,UserProfession,UserCity,RegDate FROM tblUser order by UserID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( userMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    find: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserFind(?)', [data.UserID], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject(userMessage.find.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
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
            mysqlDataContext.query('CALL UserSignUp(?,?,?,?,?,?,?,?)', [data.UserName, data.UserSurname, data.UserEmail, data.UserPassword, data.UserDate, data.UserProfession, data.UserCity,data.RegDate], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(userMessage.signUp.Ok);
                    else
                        reject(userMessage.signUp.Internal_Server_Error);
                else
                    reject(error.errno == 1644 ? userMessage.signUp.Conflict : { status: 500, message: error.message });
            });
        });
    },
    delete: (UserID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblUser WHERE UserID = ?', [UserID], (error, result) => {
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