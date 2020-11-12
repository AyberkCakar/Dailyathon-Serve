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
    criptoInsert: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
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
    criptoUpdate: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'],(error, result) => {
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
    stockInsert: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
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
    stockUpdate: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
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
    currencyInsert: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
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
    currencyUpdate: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.currency.update );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    pharmacyList: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblPharmacy WHERE City = ? or Dist = ? order by PharmacyID asc',[data.city,data.dist] ,(error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.pharmacy.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    pharmacyInsert: (query) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query(query['query'], (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( apiMessage.pharmacy.insert );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    pharmacyDelete: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('TRUNCATE TABLE tblPharmacy', (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(apiMessage.pharmacy.delete.Ok);
                    else
                        resolve(apiMessage.pharmacy.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};