const { mysqlDataContext } = require('../dataContexts');
const { logMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    adminlogList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblAdminLog order by LogID DESC', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( logMessage.AdminLog.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    adminlogInsert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT tblAdminLog tbl SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( logMessage.AdminLog.insert.Ok );
                    else
                        reject(logMessage.AdminLog.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    adminlogDelete: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('TRUNCATE TABLE tblAdminLog', (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(logMessage.AdminLog.delete.Ok);
                    else
                        resolve(logMessage.AdminLog.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    servelogList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblServeLog order by LogID DESC', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( logMessage.ServeLog.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    servelogInsert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT tblServeLog tbl SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( logMessage.ServeLog.insert.Ok );
                    else
                        reject(logMessage.ServeLog.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    servelogDelete: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('TRUNCATE TABLE tblServeLog', (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(logMessage.ServeLog.delete.Ok);
                    else
                        resolve(logMessage.ServeLog.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
