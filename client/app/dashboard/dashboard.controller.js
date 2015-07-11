'use strict';

angular.module('proj4App')
  .controller('DashboardCtrl', function ($http, Auth, twitSentService) {
    console.log('DashboardCtrl is alive');

    var that = this;

    that.twitSentQuery = function() {
      console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' && that.userInput !== null) {
      twitSentService.search(that.userInput).success(function(json) {
        console.log(json.score);
        that.twitAnalysisScore = json.score;
      });
      }
    }

  });
