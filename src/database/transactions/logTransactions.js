const { mysqlDataContext } = require('../dataContexts');
const { logMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    adminloglist: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblAdminLog order by LogID DESC', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( logMessage.AdminLog.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
