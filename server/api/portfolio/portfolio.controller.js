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
  var userId = req.params.userid.trim();
  var stockId = req.params.stockid.trim();
  // console.log('userId: ' + userId + ', stockId: ' + stockId);
  console.log(', stockId: ' + stockId);

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
          console.log('Found stock ' + stock.name + ' in portfolio, therefore incrementing qty');
          found.qty = found.qty + 1;
          found.save(function() {
            console.log('Saved new qty.');
          });
        }
        else {
          console.log('>>>>>>Stock not found');
          var newStockInPortfolio = new StockInPortfolio({stock: stock, qty: 30});
          newStockInPortfolio.save(function() {
            console.log('portfolio.stocksInPortfolio is :' + portfolio.stocksInPortfolio.stock);
            portfolio.stocksInPortfolio.push(newStockInPortfolio);
            portfolio.save(function() {
              console.log('saving and returning response');
              return res.json(201, portfolio);
            });
          });
        }
      });
    });
  });
}

exports.sellStock = function(req, res) {
  var userId = req.params.userid.trim();
  var stockId = req.params.stockid.trim();
  console.log('userId: ' + userId + ', stockId: ' + stockId);

   Stock.findById(stockId, function(err, stock) {
      // console.log('stock is: ' + stock);
      if (err) { return handleError(res, err); }
      if (!stock) { return res.send(404); }


      // User.findById(userId, function(err, user) {
      //   if (err) { return handleError(res, err); }

      //   if (!user) { return res.send(404); }
      //   // console.log('user is: ' + user);
      //   var portfolioId = user.portfolio;

      // )};
 });
}
//get user's portfolio from DB
exports.get = function(req, res) {
  var userId = req.params.userid;
  console.log('userId is ' + userId);

  User.findById(userId)
  .populate('portfolio.stocksInPortfolio')
  .exec(function(err, user) {
    console.log('user: ' + user.name);
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    console.log('returning portfolio: ' + JSON.stringify(user.portfolio));
    res.json(200, user.portfolio);
  });
}

function handleError(res, err) {
  return res.send(500, err);
}
