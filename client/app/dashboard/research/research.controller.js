'use strict';

angular.module('proj4App')
  .controller('ResearchCtrl', function (twitSentService, yahooFinanceService) {
    var that = this;

    that.twitSentQuery = function(userInput) {
      console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(that.userInput).success(function(json) {
        that.twitAnalysis = json;

      });
      };
    }

    that.yahooSearch = function(stockInput) {
      yahooFinanceService.search(that.stockInput).success(function(json) {
        that.yahooResults = json;
        console.log(JSON.stringify(that.yahooResults));
      })
    }
  });
