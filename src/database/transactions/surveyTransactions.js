const { mysqlDataContext } = require('../dataContexts');
const { surveyMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblSurveyList order by SurveyListID desc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( surveyMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    surveyUserList: (UserID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT  * FROM tblSurveyList WHERE SurveyListID NOT IN (SELECT SurveyListID FROM tblSurveyUser WHERE UserID= ?)', [(UserID)], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject(surveyMessage.SurveyUserList.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    find: (SurveyListID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblSurveyList WHERE SurveyListID = ?',[SurveyListID], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( surveyMessage.find.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblSurveyList SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( surveyMessage.insert.Ok );
                    else
                        reject(surveyMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    surveyAsRead: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblSurveyUser SET UserID = ?, SurveyListID = ?', [data.UserID,data.SurveyListID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( surveyMessage.userToSurveyRead.Ok );
                    else
                        reject(surveyMessage.userToSurveyRead.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblSurveyList SET ? WHERE SurveyListID = ?', [data, data.SurveyListID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(surveyMessage.update.Ok);
                    else
                        reject(surveyMessage.update.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (SurveyListID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblSurveyList WHERE SurveyListID = ?', [SurveyListID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(surveyMessage.delete.Ok);
                    else
                        resolve(surveyMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};