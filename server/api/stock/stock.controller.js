'use strict';
var Stock = require('./stock.model');
var async = require('async');
var yahooFinanceMultipleSymbolSearch = require('../../logic/yahooFinanceMultipleSymbolSearch');
var yahooFinanceSearch = require('../../logic/yahooFinanceSearch');
var CronJob = require('cron').CronJob;
//Gets all da stocks
exports.index = function(req, res) {
  console.log('stocks get was hit');
  Stock.find(function (err, stocks) {
    if(err) { return handleError(res, err); }
    return res.json(200, stocks);
  });
};

// Get a single stock
exports.show = function(req, res) {
  Stock.findById(req.params.id, function (err, stock) {
    if(err) { return handleError(res, err); }
    if(!stock) { return res.send(404); }
    return res.json(stock);
  });
};
//ADMIN onlly, destroys stock inventory
exports.destroy = function(req, res) {
  Stock.remove({}, function(err) {
   console.log('collection removed');
   return res.send(204);
});
}


//Admin only, Creates a new, single stock in DB
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
  return res.json(201, savedStocks);
}
//Admin only, creates inventory of stocks from YAHOO API for stock trading in app
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

function isValidData(dataFromYahoo) {
  // if (!dataFromYahoo.lastTradeDate) {
  //   console.log('WARN: dataFromYahoo has no lastTradeDate');
  //   return false;
  // }
  if (!dataFromYahoo.lastTradePriceOnly) {
    console.log('WARN: dataFromYahoo has no lastTradePriceOnly');
    return false;
  }
  // if (!dataFromYahoo.dividendYield) {
  //   console.log('WARN: dataFromYahoo has no dividendYield');
  //   return false;
  // }
  // if (!dataFromYahoo.peRatio) {
  //   console.log('WARN: dataFromYahoo has no peRatio');
  //   return false;
  // }
  return true;
}
var time = new Date();

//Admin only, updates stock prices
//TODO: some validation to make sure correct stocks are matched
var updateStocks = function (req, res) {
  Stock.find({}, function(err, stocks) {
    yahooFinanceMultipleSymbolSearch(function (data, err) {
      if (err) return handleError(err);
      var functions = [];
      for (var i = 0; i < stocks.length ; i++) {
        if (isValidData(data[i])) {
          stocks[i].lastTradeDate = data[i].lastTradeDate;
          stocks[i].lastTradePriceOnly = data[i].lastTradePriceOnly;
          //testing only:
          // stocks[i].lastTradePriceOnly += 90;

          stocks[i].dividendYield = data[i].dividendYield;
          stocks[i].peRatio = data[i].peRatio;

    //Found this on stackoverflow
          functions.push((function(doc) {
            return function(callback) {
              // console.log('Saving updated stock: ' + doc);
              doc.save(callback);
            };
          })(stocks[i])); //IIFE
          // console.log(stocks[i].name + '::::is stocks');
        }
      }
      console.log('Parallel save of ' + functions.length + ' stocks at: ' + time + ' time' );
      async.parallel(functions, function(err, results) {
        if (err) return handleError(res, err);
        console.log('All the updated stocks are now saved at: ' + time + ' time');
        // res.json(201, results);
      })
    });
  });
}
//get a date for the console logs

//start that job!
var job = new CronJob({
  cronTime: '00 09-18 * * 2-6',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday) from 9 - 6PM(hopefully)
     */
     updateStocks();
     console.log('stocks updated at ' + time);
  },
  start: false,
  timeZone: 'America/New_York'
});
//test if your cron pattern is valid!!!!!!!!!!!!!!
// function job3 (callback) {
//     try {
//         console.log('hit job3()');
//         new CronJob({
//             cronTime: '00 09-18 * * 1-5',
//             onTick: function () {
//                console.log('this should not be printed');
//             },
//             start: true,
//             timeZone: 'America/Los_Angeles'
//         });
//     } catch (ex) {
//         callback('Daily sales sync cron pattern not valid');
//     }
// };
//
exports.update = function (req, res) {
    job.start();
    console.log('job schedule started!')
    res.send(200);
}

function handleError(res, err) {
  return res.send(500, err);
}
