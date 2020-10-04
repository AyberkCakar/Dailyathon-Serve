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
                        reject( newsMessage.newsCategoryList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT NewsID,NewsTitle,NewsDescription,NewsImage,C.NewsCategoryID,NewsCategoryName FROM ' +
                'tblNews N inner join tblnewscategory C\n' +
                '    on N.NewsCategoryID = C.NewsCategoryID\n' +
                'order by NewsID desc', (error, result) => {
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
