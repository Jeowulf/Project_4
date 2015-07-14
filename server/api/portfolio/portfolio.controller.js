// controller.index); //For main feed of all users portfolios
// controller.get); //Get specific portfolio
// controller.add); //TODO: create stock ID. add a stock(s) to a users portfolio
// controller.changeQuantity); //edits quantity of a stock in users portfolio
// controller.destroy); //Destroys/resets users entire portfolio
// controller.sell); //Sells/deletes all quantities of particular stock from users portfolio

'use strict';
var StockInPortfolio = require('./stockInPortfolio.model');
var Portfolio = require('./portfolio.model');
var Stock = require('../stock/stock.model');
var User = require('../user/user.model')
function findStockInPortfolio(user, id) {
  return _.find(user.portfolio, function(stockInPortfolio) {
    console.log('Comparing ' + stockInPortfolio.item + ' to ' + id);
    return stockInPortfolio.stock.equals(id) || stockInPortfolio._id.equals(id);
  });
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
        console.log(portfolio);
        var newStockInPortfolio = new StockInPortfolio({stock: stock, qty: 30});
        portfolio.stocksInPortfolio.push(newStockInPortfolio);
        portfolio.save(function(){
          newStockInPortfolio.save(function(){
            console.log('portfolio.stocksInPortfolio is :' + portfolio.stocksInPortfolio);
            return res.json(201, portfolio);
          });
        });
      });

      // TODO: write this
      // Check if stock is already in portoflio
      //found is embedded in the user
      // var found = findstockInPortfolio(user, stock._id);
      // if (found) {
      //   console.log('Found stock ' + stock.name + ' in portfolio, therefore incrementing qty');
      //   found.qty = found.qty + 1;
      // }
      // else {
      //   console.log('Adding stock to portfolio: ' + stock.name);
      //   user.portfolio.push( new StockInPortfolio( { stock: stock, qty: 1 } ) );
      // }
      // user.save(function() {
      //   user.populate('portfolio.stockInPortfolio', function(err, user) {
      //     return res.json(201, user.portfolio );
      //   });
      // });
    });
  });


}

function handleError(res, err) {
  return res.send(500, err);
}
