const { mysqlDataContext } = require('../dataContexts');
const { tagMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblTag order by TagID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( tagMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    categoryTagList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT T.TagID,T.TagName,C.CategoryName FROM tblTag T inner join tblCategory C on T.CategoryID = C.CategoryID ORDER BY T.TagID ASC', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( tagMessage.categoryTagList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    userTagList: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserTagList(?)',[data.UserID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( tagMessage.userTagList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    find:(TagID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblTag Where TagID = ?',[TagID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( tagMessage.find.Not_Found );
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
                        resolve( tagMessage.insert.Ok );
                    else
                        reject(tagMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    tagSelect: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserTagSelect(?,?,?)', [data.UserID,data.TagName,data.RegDate], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( tagMessage.tagSelect.Ok );
                    else
                        reject(tagMessage.tagSelect.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblTag SET ? WHERE TagID = ?', [data, data.TagID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(tagMessage.update.Ok);
                    else
                        reject(tagMessage.update.Internal_Server_Error);
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
                        resolve(tagMessage.delete.Ok);
                    else
                        resolve(tagMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    tagDelete: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserTagDelete(?,?)', [data.UserID,data.TagName], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(tagMessage.tagDelete.Ok);
                    else
                        resolve(tagMessage.tagDelete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
