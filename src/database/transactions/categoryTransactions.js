const { mysqlDataContext } = require('../dataContexts');
const { CategoryMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblCategory order by CategoryID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( CategoryMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblCategory SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( CategoryMessage.insert.Ok );
                    else
                        reject(CategoryMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (CategoryID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblCategory WHERE CategoryID = ?', [CategoryID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(CategoryMessage.delete.Ok);
                    else
                        resolve(CategoryMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};