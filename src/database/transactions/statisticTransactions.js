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
    },
    tagStatistic: (selectID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL TagStatistic(?)',[selectID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject(statisticMessage.tagStatistic.Not_Found);
                else
                    reject({status: 500, message: error.message});
            });
        });
    },
    tagStatistic: (CategoryID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL CategoryStatistic(?)',[CategoryID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject(statisticMessage.categoryStatistic.Not_Found);
                else
                    reject({status: 500, message: error.message});
            });
        });
    }
};