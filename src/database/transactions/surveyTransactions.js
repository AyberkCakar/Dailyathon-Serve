const { mysqlDataContext } = require('../dataContexts');
const { surveyMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
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
    }
};