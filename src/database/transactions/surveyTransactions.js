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
    }
};