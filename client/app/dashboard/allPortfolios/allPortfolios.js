'use strict';

angular.module('proj4App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('allPortfolios', {
        url: '/allPortfolios',
        templateUrl: 'app/dashboard/allPortfolios/allPortfolios.html',
        controller: 'AllPortfoliosCtrl as ctrl'
      });
  });
