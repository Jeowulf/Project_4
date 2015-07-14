'use strict';
var yahooFinanceSearch = require('../../logic/yahooFinanceSearch');
var yahooFinanceMultipleSymbolSearch = require('../../logic/yahooFinanceMultipleSymbolSearch');
var yahooHistorical = require('../../logic/yahooHistorical');

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





exports.search = function  (req, res) {

  yahooFinanceSearch(req.body.symbol, function (data) {
    // console.log(data.name + 'is data name');
    return res.json(201,data);
  });
}
exports.index = function (req, res) {
  yahooFinanceMultipleSymbolSearch(function (data) {
    return res.json(201, data);
  })
}

exports.put = function (req, res) {
  yahooHistorical( function (data, err) {
    if (err) { return handleError(res, err); }
    console.log("aliens" + JSON.stringify(data));
    saveStocks(data, res);
  });
}

function handleError(res, err) {
  return res.send(500, err);
}

