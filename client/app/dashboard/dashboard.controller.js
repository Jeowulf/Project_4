'use strict';

angular.module('proj4App')
  .controller('DashboardCtrl', function ($http, Auth, twitSentService, yahooFinanceService) {
    console.log('DashboardCtrl is alive');

    var that = this;

    that.twitSentQuery = function() {
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(that.userInput).success(function(json) {
        // console.log(json.score);
        that.twitAnalysisScore = json.score;
        that.twitAnaylsisData = json;
      });
      }
    }

    that.yahooFinanceQuery = function () {
      // console.log(that.userStockInput);
      if (that.userStockInput !== '' || that.userStockInput !== null) { //TODO: move defensive conditionals to service to dumb down this controller it is getting to intellegint!!!
        yahooFinanceService.search(that.userStockInput).success(function(json) {
          that.yahooData = json;
        })
      };
    }

    that.getSelectedStocks = function () {
      yahooFinanceService.getSelectedStocks().success(function (json) {
        that.selectedStockData = json;
      })
    }

  });
