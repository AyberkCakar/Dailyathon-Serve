const { mysqlDataContext } = require('../dataContexts');
const { apiMessage } = require ('../../fixtures/messageStatus.json');

module.exports = {
    criptoList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblCripto order by CriptoID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.cripto.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    criptoInsert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('Insert INTO tblCripto SET ?',[data], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.cripto.insert );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    stockList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblStock order by StockID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.cripto.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    currencyList: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblCurrency order by CurrencyID asc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.currency.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};