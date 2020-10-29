const { mysqlDataContext } = require('../dataContexts');
const { statisticMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    dashboard: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL DashboardGetData()', (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject(statisticMessage.dashboard.Not_Found);
                else
                    reject({status: 500, message: error.message});
            });
        });
    }
};