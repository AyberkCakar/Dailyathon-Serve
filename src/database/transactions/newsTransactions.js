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
    },
    userNewsList: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserNews(?)',[data.UserID], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject( newsMessage.userNewsList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblNews SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( newsMessage.insert.Ok );
                    else
                        reject(newsMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (NewsID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblNews WHERE NewsID = ?', [NewsID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(newsMessage.delete.Ok);
                    else
                        resolve(newsMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
