'use strict';

angular.module('proj4App')
  .controller('AllPortfoliosCtrl', function (portfolioService) {

    var that = this;

    that.getPortfolios = function() {
      portfolioService.getAllPortfolios().then(function(json) {
        that.allPortfolios = json.data;
      });
    }

    that.getPortfolios();

  });
