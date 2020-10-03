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
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblTag SET ?)', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( TagMessage.insert.Ok );
                    else
                        reject(TagMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
