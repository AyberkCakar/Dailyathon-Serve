const { mysqlDataContext } = require('../dataContexts');
const { newsMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    newsCategoryList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblNewsCategory order by NewsCategoryID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( newsMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
