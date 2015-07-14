'use strict';

angular.module('proj4App')
  .controller('DashboardCtrl', function ($http, Auth, twitSentService, stockService, portfolioService, yahooFinanceService) {

    var that = this;

    stockService.getUser();//helper for server

    that.createStockInventory = function(){
      stockService.createStockInventory().success(function(json){
        console.log(json)
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
      console.log(json);
      //TODO that.portfolio = json.something;
    });
  };
  //TODO: call thsi when a user logs in and hits this page!!
  that.getUserPortfolio = function() {
    portfolioService.getUserPortfolio().success(function(json) {
      that.myPortfolio = JSON.strignify(json);

    });
  }


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


  });
