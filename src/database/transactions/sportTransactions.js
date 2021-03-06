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
    },
    find: (SportID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblSport WHERE SportID = ?',[SportID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( sportMessage.find.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblSport SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( sportMessage.insert.Ok );
                    else
                        reject(sportMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblSport SET ? WHERE SportID = ?', [data, data.SportID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(sportMessage.update.Ok);
                    else
                        reject(sportMessage.update.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (SportID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblSport WHERE SportID = ?', [SportID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(sportMessage.delete.Ok);
                    else
                        resolve(sportMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
