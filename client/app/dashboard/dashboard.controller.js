'use strict';

angular.module('proj4App')
  .controller('DashboardCtrl', function ($http, Auth, twitSentService, stockService, portfolioService, yahooFinanceService) {

    var that = this;

    that.tab = 0;
    // stockService.getUser();//helper for server

    that.createStockInventory = function(){
      stockService.createStockInventory().success(function(json){
        console.log(json);
      });
    }
    //call to get when controller is creatd/alive

    //Gets the stock inventory from the DB
    that.getStockInventory = function() {
      console.log('getStockInventory was called');
      stockService.getInventory().success(function(json) {
        console.log(json);
        that.stockInventory = json;
      });
    }
    that.twitSentQuery = function() {
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined

      twitSentService.search(that.userInput).success(function(json) {
        console.log('twitSentQuery from DashboardCtrl');
        // console.log(json.score);
        that.twitAnalysisScore = json.score;
        that.twitAnaylsisData = json;
      });
      }
    }
//User Portfolio functions
 that.buyStock = function(stock) {
    portfolioService.buyStock(stock).then(function(json) {
      console.log(json.data + 'is returned after buyStock');
       // that.myPortfolio = json.data; TODO: fix what the server is returning
      that.getUserPortfolio();
    });
  };
  that.sellStock = function(stock) {
    portfolioService.sellStock(stock).then(function(json) {
      // that.myPortfolio = json.data; //  TODO: fix this
      that.getUserPortfolio();
    });
  }
  //TODO: call thsi when a user logs in and hits this page!!
  that.getUserPortfolio = function() {
    portfolioService.getUserPortfolio().success(function(json) {
      that.myPortfolio = json;
      console.log("portfolio to follow: ")
      // stockNavService.testies();
      console.log(that.myPortfolio.stocksInPortfolio[0].stock.symbol);
      console.log('Price: ', that.myPortfolio.stocksInPortfolio[0].stock.lastTradePriceOnly);

      var portfolios = that.myPortfolio.stocksInPortfolio;
      that.total = 0;
      portfolios.map(function(portfolio) {
        var price = portfolio.stock.lastTradePriceOnly * portfolio.qty;
        that.total += price;
      });
      console.log(that.total);
    });
  }
  // that.portFolioTotalValue = function (portfolio) {
  //   portfolioService.getPortfolioTotal(portfolio);
  //   console.log("colin says")
  // }
  // that.portFolioTotalValue(that.myPortfolio);

  //run when controller is instantiated
  that.getStockInventory();
  that.getUserPortfolio();
  that.getStockInventory();
    // NOT CURRENTLY USING:
//search for individual stock by ticker symbol and saves it to DB
    that.yahooFinanceQuery = function () {
      // console.log(that.userStockInput);
      if (that.userStockInput !== '' || that.userStockInput !== null) { //TODO: move defensive conditionals to service to dumb down this controller it is getting to intellegint!!!
        yahooFinanceService.search(that.userStockInput).success(function(json) {
          that.yahooData = json;
        })
      };
    }
//Gets From Yahoo Data for our 23 preselected stocks and saves this info to our DB
    that.getSelectedStocks = function () {
      yahooFinanceService.getSelectedStocks().success(function (json) {
        that.selectedStockData = json;
      })
    };
//Gets the twitter sentiments for selected handle

  that.getTwitterSentiments = function() {
    twitSentService.findSpecificSentiment().success(function (json) {
      that.specificSentiment = json;
      // console.log(that.specificSentiment);
    })
  }
  that.getTwitterWords = function() {
    twitSentService.findSpecificSentiment().success(function (json) {
      that.specificSentiment = json;
      console.log(that.specificSentiment.words)
      return that.specificSentiment;
      that.words = [];
      for (var i = 0; i < that.specificSentiment.words.length; i++) {
        that.words.push(that.specificSentiment.words[i]);
      }
      console.log("word = " + that.words)
    })
  }
  that.callingAllTwitterFunctions = function () {
    that.getTwitterSentiments();
    that.getTwitterWords();
  }
  //get date
that.date = new Date();



});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//that.myPortfolio.stocksInPortfolio[i].stock
//              ~> ._id
//                 .peRatio
//                 .dividendYield
//                 .symbol
//                 .twitterHandle
//                 .name
//                 .lastTradePriceOnly
//                 .lastTradeDate
