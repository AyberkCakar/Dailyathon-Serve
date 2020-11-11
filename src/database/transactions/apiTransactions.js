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
    criptoUpdate: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblCripto SET ? WHERE Code = ?',[data,data.Code], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.cripto.update );
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
                        reject( apiMessage.stock.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    stockInsert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('Insert INTO tblStock SET ?',[data], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.stock.insert );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    stockUpdate: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblStock SET ? WHERE Code = ?',[data,data.Code], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.stock.update );
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
    },
    currencyInsert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('Insert INTO tblCurrency SET ?',[data], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.currency.insert );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    currencyUpdate: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblCurrency SET ? WHERE Code = ?',[data,data.Code], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.currency.update );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};