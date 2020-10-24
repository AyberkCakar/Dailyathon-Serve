const { mysqlDataContext } = require('../dataContexts');
const { announcementMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblAnnouncement order by AnnouncementID desc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( announcementMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    find: (AnnouncementID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblAnnouncement WHERE AnnouncementID = ?',[AnnouncementID], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject( announcementMessage.find.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    announcementUserList: (UserID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT  * FROM tblAnnouncement WHERE AnnouncementID NOT IN (SELECT AnnouncementID FROM tblAnnouncementUser WHERE UserID= ?)', [(UserID)], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject(announcementMessage.AnnouncementUserList.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblAnnouncement SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( announcementMessage.insert.Ok );
                    else
                        reject(announcementMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    announcementAsRead: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblAnnouncementUser SET UserID = ?, AnnouncementID = ? , RegDate = ?', [data.UserID,data.AnnouncementID,data.RegDate], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( announcementMessage.announcementAsRead.Ok );
                    else
                        reject(announcementMessage.announcementAsRead.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblAnnouncement SET ? WHERE AnnouncementID = ?', [data, data.AnnouncementID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(announcementMessage.update.Ok);
                    else
                        reject(announcementMessage.update.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (AnnouncementID) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblAnnouncement WHERE AnnouncementID = ?', [AnnouncementID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(announcementMessage.delete.Ok);
                    else
                        resolve(announcementMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};