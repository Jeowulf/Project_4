// controller.index); //For main feed of all users portfolios
// controller.get); //Get specific portfolio
// controller.add); //TODO: create stock ID. add a stock(s) to a users portfolio
// controller.changeQuantity); //edits quantity of a stock in users portfolio
// controller.destroy); //Destroys/resets users entire portfolio
// controller.sell); //Sells/deletes all quantities of particular stock from users portfolio

'use strict';
var _ = require('lodash');
var StockInPortfolio = require('./stockInPortfolio.model');
var Portfolio = require('./portfolio.model');
var Stock = require('../stock/stock.model');
var User = require('../user/user.model');
var deepPopulate = require('mongoose-deep-populate');

function findStockInPortfolio(portfolio, id) {
  console.log('User portfolio has ' + portfolio.stocksInPortfolio.length + ' stocks');
  var result = _.find(portfolio.stocksInPortfolio, function(stockInPortfolio) {
    console.log('=======Comparing ' + stockInPortfolio.stock + ' to ' + id);
    // console.log('+++++++ typeOF' + typeof stockInPortfolio);
    return stockInPortfolio.stock.equals(id) || stockInPortfolio._id.equals(id);
  });
  console.log('=======findStockInPortfolio is returning result: ' + result);
  return result;
}

exports.buyStock = function(req, res) {
  // console.log('buyStock, url = ' + req.url);
  var stockQty = req.body.qty; //Let's save the stock quantity to a variable!!!
  // console.log ('stockQty is:  +++' + stockQty);
  var userId = req.params.userid.trim();
  var stockId = req.params.stockid.trim();
  // console.log('userId: ' + userId + ', stockId: ' + stockId);
  // console.log(', stockId: ' + stockId);

  Stock.findById(stockId, function(err, stock) {
    // console.log('stock is: ' + stock);
    if (err) { return handleError(res, err); }
    if (!stock) { return res.send(404); }


    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }

      if (!user) { return res.send(404); }
      // console.log('user is: ' + user);
      var portfolioId = user.portfolio;
      // console.log('portfolio id for user is:' + portfolioId);
//TODO: Fix what the server is returning, it's not populating the stocks
      Portfolio.findById(portfolioId).populate("stocksInPortfolio").exec(function(err, portfolio) {
        if (err) { return handleError(res, err); }
        if (!portfolio) { return res.send(404); }
        //Validation to see if stock is already in portfolio
        var found = findStockInPortfolio(portfolio, stock._id);
        if (found) {
          console.log('Found stock ' + stock.name + ' in portfolio, therefore incrementing qty');
          found.qty = found.qty + stockQty;
          found.save(function() {
            console.log('Saved new qty. returning a response=====' + portfolio.stocksInPortfolio);
            var price = stock.lastTradePriceOnly * stockQty;
            //let's get a price to deduct from total!
            console.log(price + ' is PRICE!!!!!!!!!!!');

            portfolio.cash = (portfolio.cash - price) - 20;
            console.log(portfolio.cash + ' is portfolio.cash');
            portfolio.save(function(){
              return res.json(201, portfolio);
            });
          });
        }
        else {
          console.log('>>>>>>Stock not found');
          var newStockInPortfolio = new StockInPortfolio({stock: stock, qty: stockQty});
          newStockInPortfolio.save(function() {
            // console.log('portfolio.stocksInPortfolio is :' + portfolio.stocksInPortfolio.stock);
            portfolio.stocksInPortfolio.push(newStockInPortfolio);
            var price = stock.lastTradePriceOnly * stockQty;
            //let's get a price to deduct from total!
            console.log(price + ' is PRICE!!!!!!!!!!!');
            portfolio.cash = (portfolio.cash - price) - 20;
            console.log(portfolio.cash + ' is portfolio.cash')
            portfolio.save(function() {
              console.log('saving and returning response portfolio::::::::' + portfolio.stocksInPortfolio);
              return res.json(201, portfolio.stocksInPortfolio);
            });
          });
        }
      });
    });
  });
}
exports.sellStock = function(req, res) {
  // console.log('buyStock, url = ' + req.url);
  var stockQty = req.body.qty; //Let's save the stock quantity to a variable!!!
  console.log ('stockQty is:  +++' + stockQty);
  var userId = req.params.userid.trim();
  var stockId = req.params.stockid.trim();
  // console.log('userId: ' + userId + ', stockId: ' + stockId);
  // console.log(', stockId: ' + stockId);

  Stock.findById(stockId, function(err, stock) {
    // console.log('stock is: ' + stock);
    if (err) { return handleError(res, err); }
    if (!stock) { return res.send(404); }

    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }

      if (!user) { return res.send(404); }
      // console.log('user is: ' + user);
      var portfolioId = user.portfolio;
      // console.log('portfolio id for user is:' + portfolioId);

      Portfolio.findById(portfolioId).populate("stocksInPortfolio").exec(function(err, portfolio) {
        if (err) { return handleError(res, err); }
        if (!portfolio) { return res.send(404); }
        console.log(stock._id + 'is stock._id');
        //Validation to see if stock is already in portfolio
        var found = findStockInPortfolio(portfolio, stock._id);
        if (found) {
          console.log('Found stock ' + stock.name + ' in portfolio, therefore decrementing qty');
          if (found.qty > 0 && found.qty >= stockQty){
            // found.qty > stockQty ? found.qty - stock Qty : return handleError(res, err);
            var price = stock.lastTradePriceOnly * stockQty;
            //let's get a price to deduct from total!
            console.log(price + ' is PRICE!!!!!!!!!!!');

            portfolio.cash = portfolio.cash + price;
            console.log(portfolio.cash + ' is portfolio.cash');

          found.qty = found.qty - stockQty;
          found.save(function() {
            console.log('Saved new qty.');
            portfolio.save(function(){
              return res.json(201, portfolio);
            });
          });
        }
          else  {
            console.log('stockQty was 0!!!');
            return res.send(404);
          }
        }
        else {
          console.log('>>>>>>Stock not found');
//Send a 404 if there's no stock
         return res.send(404);
        }
      });
    });
  });
}
exports.konamiKash = function(req, res) {
  console.log('konamiKash==========================');
  var stockQty = req.body.qty; //Let's save the stock quantity to a variable!!!
  console.log ('stockQty is:  +++' + stockQty);
  var userId = req.params.userid.trim();
  var stockId = req.params.stockid.trim();
  // console.log('userId: ' + userId + ', stockId: ' + stockId);
  // console.log(', stockId: ' + stockId);

  Stock.findById(stockId, function(err, stock) {
    // console.log('stock is: ' + stock);
    if (err) { return handleError(res, err); }
    if (!stock) { return res.send(404); }

    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }

      if (!user) { return res.send(404); }
      // console.log('user is: ' + user);
      var portfolioId = user.portfolio;
      // console.log('portfolio id for user is:' + portfolioId);

      Portfolio.findById(portfolioId).populate("stocksInPortfolio").exec(function(err, portfolio) {
        if (err) { return handleError(res, err); }
        if (!portfolio) { return res.send(404); }
        console.log(stock._id + 'is stock._id');
        //Validation to see if stock is already in portfolio
        var found = findStockInPortfolio(portfolio, stock._id);
        if (found) {
          console.log('Found stock ' + stock.name + ' in portfolio, therefore decrementing qty');
          if (found.qty > 0 && found.qty >= stockQty){
            // found.qty > stockQty ? found.qty - stock Qty : return handleError(res, err);
            var price = stock.lastTradePriceOnly * stockQty;
            //let's get a price to deduct from total!
            console.log(price + ' is PRICE!!!!!!!!!!!');

            portfolio.cash = portfolio.cash + price;
            console.log(portfolio.cash + ' is portfolio.cash');

          found.qty = found.qty - stockQty;
          found.save(function() {
            console.log('Saved new qty.');
            portfolio.save(function(){
              return res.json(201, portfolio);
            });
          });
        }
          else  {
            console.log('stockQty was 0!!!');
            return res.send(404);
          }
        }
        else {
          console.log('>>>>>>Stock not found');
//Send a 404 if there's no stock
         return res.send(404);
        }
      });
    });
  });
}

//get user's portfolio from DB
exports.get = function(req, res) {
  var userId = req.params.userid;
  console.log('userId is ' + userId);

  User.findById(userId)
  .deepPopulate('portfolio portfolio.stocksInPortfolio portfolio.stocksInPortfolio.stock')
  .exec(function(err, user) {
    // console.log('user: ' + user.name);
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    // console.log('returning portfolio.stocksInPortfolio: ' + JSON.stringify(user.portfolio.stocksInPortfolio));
    console.log('returning portfolio: ' + user.portfolio);
    res.json(200, user.portfolio);
  });
}

//Get (all) portfolios from DB
exports.index = function(req, res) {
  User.find().deepPopulate('portfolio portfolio.stocksInPortfolio portfolio.stocksInPortfolio.stock').exec(function(err, users){
    if(err) { return handleError(res, err); }
    // console.log(portfolios[1].stocksInPortfolio[0]);
    console.log(users[2].portfolio.stocksInPortfolio[0] + ' from all ports cal!!!!!@#@#$#%$^%^');
    return res.json(200, users);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
