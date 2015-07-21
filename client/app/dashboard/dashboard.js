'use strict';

angular.module('proj4App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl as ctrl'
      })
     .state('stockInventory', {
      url: '/stockinventory',
      templateUrl: 'app/dashboard/partials/stockinventory.html',
      controller: 'DashboardCtrl as ctrl'
    })
     .state('portfolio', {
      url: '/portfolio',
      templateUrl: 'app/dashboard/partials/portfolio.html',
      controller: 'DashboardCtrl as ctrl'
    });
  });
