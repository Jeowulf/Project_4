'use strict';
var Stock = require('./stock.model');
var yahooFinanceMultipleSymbolSearch = require('../../logic/yahooFinanceMultipleSymbolSearch');
var yahooFinanceSearch = require('../../logic/yahooFinanceSearch');

exports.index = function(req, res) {
  console.log('stocks get was hit');
  Stock.find(function (err, stocks) {
    if(err) { return handleError(res, err); }
    return res.json(200, stocks);
  });
};


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
  var twitterHandles = ['@BestBuy', '@adidasoriginals', '@Target', '@Delta', '@Nike', '@McDonalds', '@AmericanExpress','@CocaCola', '@VerizonWireless', '@Pepsi', '@BlackBerry', '@PlayStation', '@SouthwestAir', '@etsy', '@JetBlue', '@SamsungMobileUS', '@Starbucks',' @WholeFoods', '@Google', '@Microsoft', '@Yahoo', '@Intel', '@AT&T'];
  for (var i = 0; i < stocks.length ; i++) {
    var newStock = new Stock();
    //Twitter insert start
    newStock.twitterHandle = twitterHandles[i];
    //Twitter insert end
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

exports.update = function (req, res) {
  Stock.find({}, function(err, stocks) {
    yahooFinanceMultipleSymbolSearch(function (data, err) {
    if (err) return handleError(err);
    for (var i = 0; i < stocks.length ; i++) {
      stocks[i].lastTradeDate = data[i].lastTradeDate;
      stocks[i].lastTradePriceOnly = data[i].lastTradePriceOnly;
      stocks[i].dividendYield = data[i].dividendYield;
      stocks[i].peRatio = data[i].peRatio;
      stocks[i].save(function(err, stocks){
        console.log(stocks);
      })
      console.log(stocks[i].name + '::::is stocks');
      }
    });
  });
}


function handleError(res, err) {
  return res.send(500, err);
}
