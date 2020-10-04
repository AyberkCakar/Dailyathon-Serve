const { mysqlDataContext } = require('../dataContexts');
const { sportMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblSport order by SportID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( sportMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
