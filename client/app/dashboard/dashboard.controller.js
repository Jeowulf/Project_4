'use strict';

angular.module('proj4App')
  .controller('DashboardCtrl', function ($http, $state, Auth, twitSentService, stockService, portfolioService, yahooFinanceService) {

    var that = this;

    // stockService.getUser();//helper for server

    that.createStockInventory = function(){
      stockService.createStockInventory().success(function(json){
        // console.log(json);
      });
    }
    //call to get when controller is creatd/alive

    //Gets the stock inventory from the DB
    that.getStockInventory = function() {
      stockService.getInventory().success(function(json) {
        // console.log(json + '   is getInvetory json');
        that.stockInventory = json;
      });
    }
    //Array stores the twitter analysis after they are sought/found and then we will map the correct analysis to the correct stock!!!!!!!!!!!!!
    that.twitAnalysis = [];
    that.twitSentQuery = function(userInput, id, name) {
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(userInput).success(function(json) {
        // console.log('twitSentQuery from DashboardCtrl');
        // console.log(json);

        that.twitAnalysis.push({id: id, name: name, score: json.score, comparative: json.comparative,  tokens: json.tokens, words: json.words});

        console.log(that.twitAnalysis  + '     is that.twitAnalysisScore array');
        // that.twitAnaylsisData = json;

      });
      }
    }

//Let's try and map the twitAnalysis to the correct stock!!!!!!!!!!
  that.matchTwit = function(collection, id) {

    that.matchingTwit = _.findWhere(collection, {id: id}, 'stock');
    console.log(that.matchingTwit.id + ' is matchTwit!!');
   // console.log(collection + ' is collection passed into matchTwit!!');
   // console.log(id + ' is id passed into matchTwit!!');
  }

// get inviddual stock's showpage
   that.goStock = function (stock) {
    console.log(stock._id + 'is stock._id');
    $state.go( 'stockShow', { stockId : stock._id } );
  };
//User Portfolio functions
 that.buyStock = function(stock) {
    portfolioService.buyStock(stock).then(function(json) {
      console.log(JSON.stringify(json.data) + 'is returned after buyStock');
       that.myPortfolio = json.data; //TODO: fix what the server is returning
      // that.getUserPortfolio();
      console.log(that.twitAnalysis  + '     is that.twitAnalysisScore array');
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
      // console.log(JSON.stringify(that.myPortfolio) + "  Is that.myPortfolio");

    });
  }
  //run when controller is instantiated
  that.getStockInventory();
  that.getUserPortfolio();
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
  // console.log(that.words + " adf")
  // console.log(that.specificSentiment)
});

