'use strict';
var Stock = require('./stock.model');
var yahooFinanceMultipleSymbolSearch = require('../../logic/yahooFinanceMultipleSymbolSearch');
var yahooFinanceSearch = require('../../logic/yahooFinanceSearch');
//Creates a new, single stock in DB

exports.create = function (req, res) {
  // console.log(req.body.symbol + 'is symbol from postman');
  var newStock = new Stock();
  yahooFinanceSearch(req.body.symbol, function (data, err) { //do API search and wait for data
      if (err) { return handleError(res, err); }
//TODO: check for Duplicates - validation
      newStock.name = data.name;
      newStock.symbol = data.symbol;
      newStock.lastTradeDate = data.lastTradeDate;
      newStock.lastTradePriceOnly = data.lastTradePriceOnly;
      newStock.dividendYield = data.dividendYield;
      newStock.peRatio = data.peRatio;
      console.log(newStock.name + 'is selectedStock');

      newStock.save(function (err, stock) {
        if (err) { return handleError(res, err); }
        res.json(201, stock);
       });
    });

}

function handleError(res, err) {
  return res.send(500, err);
}
