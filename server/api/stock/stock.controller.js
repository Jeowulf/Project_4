'use strict';
var Stock = require('./stock.model');
var yahooFinanceMultipleSymbolSearch = require('../../logic/yahooFinanceMultipleSymbolSearch');
var yahooFinanceSearch = require('../../logic/yahooFinanceSearch');
//Creates a new, single stock in DB

exports.create = function (req, res) {
  // console.log(req.body.symbol + 'is symbol from postman');

  yahooFinanceSearch(req.body.symbol, function (data, err) { //do API search and wait for data
      if (err) { return handleError(res, err); }
//TODO: check for Duplicates - validation
//TODO: refactor this
      var newStock = new Stock();
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

exports.createSet = function (res) {
  yahooFinanceMultipleSymbolSearch(function (data, err) { //do API search and wait for data
      if (err) { return handleError(res, err); }
//TODO: check for Duplicates - validation
//TODO: refactor this
      var stockArray = [];
      for (var i = 0; i < data.length ; i++) {
         var newStock = new Stock();
          newStock.name = data[i].name;
          newStock.symbol = data[i].symbol;
          newStock.lastTradeDate = data[i].lastTradeDate;
          newStock.lastTradePriceOnly = data[i].lastTradePriceOnly;
          newStock.dividendYield = data[i].dividendYield;
          newStock.peRatio = data[i].peRatio;
          console.log(newStock.name + 'is selectedStock');

          // stockArray.push(newStock);
          newStock.save(function(err, stock) {

          });
      }
      res.send('stockArray is saved'); //- trying to send json array after loop is over
      // console.log(data.length + ' this is data!!');
      // var newStock = new Stock();


      // newStock.save(function (err, stock) {
      //   if (err) { return handleError(res, err); }
      //   res.json(201, stock);
      //  });
    });
}

function handleError(res, err) {
  return res.send(500, err);
}
