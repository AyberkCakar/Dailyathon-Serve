const { mysqlDataContext } = require('../dataContexts');
const { entertainmentMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL EntertainmentList()', (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( entertainmentMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    cityEntertainmentList: (UserCity) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL EntertainmentCityList(?)',[UserCity], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( entertainmentMessage.cityEntertainmentList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    tagEntertainmentList: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserEntertainment(?)',[data.UserID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( entertainmentMessage.tagEntertainmentList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    find: (EntertainmentID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblEntertainment E INNER JOIN tblTag T ON E.TagID=T.TagID  WHERE EntertainmentID = ?',[EntertainmentID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( entertainmentMessage.find.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( entertainmentMessage.insert.Ok );
                    else
                        reject(entertainmentMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (EntertainmentID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblEntertainment WHERE EntertainmentID = ?', [EntertainmentID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(entertainmentMessage.delete.Ok);
                    else
                        resolve(entertainmentMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
