const { mysqlDataContext } = require('../dataContexts');
const { leagueMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL LeagueList()', (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( leagueMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    tableList: (UserID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL LeagueTableName(?)',[UserID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( leagueMessage.LeagueTablenameList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    userLeagueList: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM ?? WHERE LeagueID IN (SELECT LeagueID  FROM tblLeague where LeagueName in ' +
                '          (SELECT TagName FROM tblTag WHERE TagID  IN' +
                '          (SELECT TagID FROM tblTagUser WHERE UserID = ?)' +
                '          and CategoryID = (SELECT CategoryID from tblCategory where CategoryName="Lig" )));',[data.LeagueTableName,data.UserID], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( leagueMessage.LeagueTablenameList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    find:(LeagueID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblLeague WHERE LeagueID = ?',[LeagueID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( leagueMessage.find.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    standingsList:(data) => {
        var table;
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('Select LeagueTableName From tblSport where SportID = ?',[data.SportID], (error, result) => {
                table = (result[0] != undefined && result[0] != null && result[0] != '' && result[0] != ' ' ? result[0]:'Nottable');
                mysqlDataContext.query('Select * from ?? WHERE LeagueID = ? ORDER BY SequenceNo ASC',[table.LeagueTableName,data.LeagueID], (error, result) => {
                    if (!error)
                        if (result != null)
                            resolve(result);
                        else
                            reject( leagueMessage.find.Not_Found );
                    else
                        reject({ status: 500, message: error.message });
                });
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
    standingsInsert: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( leagueMessage.standingsInsert.Ok );
                    else
                        reject(leagueMessage.standingsInsert.Internal_Server_Error);
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
    },
    standingsUpdate: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(leagueMessage.standingsUpdate.Ok);
                    else
                        reject(leagueMessage.standingsUpdate.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (LeagueID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblLeague WHERE LeagueID = ?', [LeagueID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(leagueMessage.delete.Ok);
                    else
                        resolve(leagueMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
