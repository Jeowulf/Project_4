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

function saveStocks(stocks, res) {
  var savedStocks = [];
  for (var i = 0; i < stocks.length ; i++) {
    var newStock = new Stock();
    newStock.name = stocks[i].name;
    newStock.symbol = stocks[i].symbol;
    newStock.lastTradeDate = stocks[i].lastTradeDate;
    newStock.lastTradePriceOnly = stocks[i].lastTradePriceOnly;
    newStock.dividendYield = stocks[i].dividendYield;
    newStock.peRatio = stocks[i].peRatio;
    // console.log(newStock.name + 'is selectedStock');

    // stockArray.push(newStock);

    newStock.save(function(err, stock) {
      if (err) { return handleError(res, err); }
      else {
        console.log('pushing: ' + stock);
        savedStocks.push(stock);
      }
    });
  }
  console.log('responding with savedStocks: ' + savedStocks);
  return res.send(201, savedStocks);
}

exports.createSet = function (req, res) {
  yahooFinanceMultipleSymbolSearch(function (data, err) { //do API search and wait for data
      if (err) { return handleError(res, err); }
//TODO: check for Duplicates - validation
//TODO: refactor this
      // var stockArray = [];
      saveStocks(data, res);
      // res.send('stockArray is saved'); //- trying to send json array after loop is over
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
