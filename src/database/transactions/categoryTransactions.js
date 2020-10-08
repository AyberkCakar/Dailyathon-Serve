const { mysqlDataContext } = require('../dataContexts');
const { categoryMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblCategory order by CategoryID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( categoryMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    find: (CategoryID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblCategory WHERE CategoryID = ?',[CategoryID], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( categoryMessage.all.Not_Found );
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
                        resolve(categoryMessage.insert.Ok );
                    else
                        reject(categoryMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblCategory SET ? WHERE CategoryID = ?', [data, data.CategoryID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(categoryMessage.update.Ok);
                    else
                        reject(categoryMessage.update.Internal_Server_Error);
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
                        resolve(categoryMessage.delete.Ok);
                    else
                        resolve(categoryMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};