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
    }
};
