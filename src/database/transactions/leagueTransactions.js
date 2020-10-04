const { mysqlDataContext } = require('../dataContexts');
const { leagueMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblLeague order by LeagueID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( leagueMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblLeague SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( leagueMessage.insert.Ok );
                    else
                        reject(leagueMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblLeague SET ? WHERE LeagueID = ?', [data, data.LeagueID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(leagueMessage.update.Ok);
                    else
                        reject(leagueMessage.update.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
