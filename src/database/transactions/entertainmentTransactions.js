const { mysqlDataContext } = require('../dataContexts');
const { entertainmentMessage }  = require('../../fixtures/messageStatus.json');

module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblEntertainment order by EntertainmentID DESC', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( entertainmentMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    cityEntertainmentList: (UserCity) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblentertainment t inner join tblentertainmentcategory tc on t.EntertainmentCategoryID = tc.EntertainmentCategoryID where  t.EntertainmentCity = ?',[UserCity], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( entertainmentMessage.cityEntertainmentList.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};
