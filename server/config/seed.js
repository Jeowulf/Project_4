/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';
var User = require('../api/user/user.model');
var Portfolio = require('../api/portfolio/portfolio.model');
var StockInPortfolio = require('../api/portfolio/stockInPortfolio.model');
var Stock = require('../api/stock/stock.model');

function addPortfolioToUser(user, portfolio, cb) {
user.portfolio = portfolio;
user.save(function(err, user) {
  User.findById(user._id).
  populate("portfolio")
  .exec(function(err, user) {
    console.log('Saved user: ' + JSON.stringify(user));
    if (cb) {
      cb();
      }
    });
  });
}
function addPortfoliosToUsers(users) {
  Portfolio.find({}, function(err, portfolios) {
    addPortfolioToUser(users[0], portfolios[0], function() {
      addPortfolioToUser(users[1], portfolios[1], function() {
        console.log('finished populating users');
      });
    });
  });
}
function addStocksInPortfoliosToPortfolios() {

}
// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       User.find({}, function(err, users) {
//         // at this point we have created 2 users
//         Portfolio.find({}).remove(function() {
//           Portfolio.create(
//           {stocksValue: 1000, cash: 1000, stocksInPortfolio: []},
//           {stocksValue: 1000, cash: 1000, stocksInPortfolio: []}
//          ,
//            function() {
//             addPortfoliosToUsers(users);
//             console.log('2 portfolios saved');
//           }
//           // ,
//           // Portfolio.find({}, function(err, portfolios){
//           //   StockInPortfolio.find({}).remove(function(){
//           //     StockInPortfolio.create(
//           //     {qty: 1},
//           //     {qty: 1},
//           //     function() {
//           //       addStocksInPortfoliosToPortfolios(portfolios);
//           //       });
//           //   });
//           // });//end stockinport find

//           );
//         });
//     }
//   );
//   });
// });
// StockInPortfolio.remove({}, function(err){
//   console.log("StockInPortfolio collection removed");
// })
//DUmp all stocks in DB on startup for dev purposes
// Stock.remove({}, function(err) {
//    console.log('collection removed')
// });
