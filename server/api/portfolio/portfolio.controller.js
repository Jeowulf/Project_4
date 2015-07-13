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
  console.log('buyStock, url = ' + req.url);
  var userId = req.params.userid.trim();
  var stockId = req.params.stockid.trim();
  console.log('userId: ' + userId + ', stockId: ' + stockId);


    Stock.findById(stockId, function(err, stock) {
    if (err) { return handleError(res, err); }
    if (!stock) { return res.send(404); }
    console.log('stock is: ' + stock);

    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }
      console.log('user is: ' + user);
      if (!user) { return res.send(404); }
      console.log('user is: ' + user);
      // Check if stock is already in portoflio

      //found is embedded in the user
      var found = findstockInPortfolio(user, stock._id);
      if (found) {
        console.log('Found stock ' + stock.name + ' in portfolio, therefore incrementing qty');
        found.qty = found.qty + 1;
      }
      else {
        console.log('Adding stock to portfolio: ' + stock.name);
        user.portfolio.push( new StockInPortfolio( { stock: stock, qty: 1 } ) );
      }
      user.save(function() {
        user.populate('portfolio.stockInPortfolio', function(err, user) {
          return res.json(201, user.portfolio );
        });
      });
    });
  });


}

function handleError(res, err) {
  return res.send(500, err);
}
