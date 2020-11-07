const { mysqlDataContext } = require('../dataContexts');
const { surveyMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblSurvey order by SurveyListID desc', (error, result) => {
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
            mysqlDataContext.query('SELECT SurveyListID,SurveyName,SurveyStartDate,SurveyDueDate FROM tblSurvey WHERE SurveyListID NOT IN (SELECT SurveyListID FROM tblSurveyUser WHERE UserID = ?)', [(UserID)], (error, result) => {
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
    surveyReadUserList: (UserID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT SurveyListID,SurveyName,SurveyStartDate,SurveyDueDate FROM tblSurvey WHERE SurveyListID IN (SELECT SurveyListID FROM tblSurveyUser WHERE UserID = ?)', [(UserID)], (error, result) => {
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
            mysqlDataContext.query('SELECT * FROM tblSurvey WHERE SurveyListID = ?',[SurveyListID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( surveyMessage.find.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    statistic: (SurveyListID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblUser WHERE UserID IN (SELECT UserID FROM tblSurveyUser where SurveyListID = ?) order by UserName ASC',[SurveyListID], (error, result) => {
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
    surveyData: (SurveyListID) => {
        var table;
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('Select SurveyTableName from tblSurvey where SurveyListID = ?',[SurveyListID], (error, result) => {
                table = result[0];
                mysqlDataContext.query('SELECT * from ??',[table.SurveyTableName], (error, result) => {
                    if (!error)
                        if (result != null)
                            resolve(result);
                        else
                            reject( surveyMessage.find.Not_Found );
                    else
                        reject({ status: 500, message: error.message });
                });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblSurvey SET ?', [data], (error, result) => {
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
            mysqlDataContext.query('INSERT INTO tblSurveyUser SET UserID = ?, SurveyListID = ? , RegDate = ?', [data.UserID,data.SurveyListID,data.RegDate], (error, result) => {
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
            mysqlDataContext.query('UPDATE tblSurvey SET ? WHERE SurveyListID = ?', [data, data.SurveyListID], (error, result) => {
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
            mysqlDataContext.query('DELETE FROM tblSurvey WHERE SurveyListID = ?', [SurveyListID], (error, result) => {
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