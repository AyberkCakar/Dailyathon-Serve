const { mysqlDataContext } = require('../dataContexts');
const { TagMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblTag order by TagID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( TagMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    categoryTagList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT T.TagID,T.TagName,C.CategoryName FROM tbltag T inner join tblcategory C on T.CategoryID = C.CategoryID ORDER BY T.TagID ASC', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( TagMessage.categoryTagList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblTag SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( TagMessage.insert.Ok );
                    else
                        reject(TagMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblTag SET ? WHERE TagID = ?', [data, data.SportID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(TagMessage.update.Ok);
                    else
                        reject(TagMessage.update.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (TagID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblTag WHERE TagID = ?', [TagID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(TagMessage.delete.Ok);
                    else
                        resolve(TagMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
