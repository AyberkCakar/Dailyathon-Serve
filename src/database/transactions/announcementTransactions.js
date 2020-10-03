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
    }
};