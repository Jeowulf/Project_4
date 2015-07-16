'use strict';

angular.module('proj4App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stockShow', {
        url: '/dashboard/stockShow/:stockId',
        templateUrl: 'app/dashboard/stockShow/stockShow.html',
        controller: 'StockShowCtrl as ctrl'
      });
  });
