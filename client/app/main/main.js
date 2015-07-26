'use strict';

angular.module('proj4App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as ctrl'
      }).state('about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: 'MainCtrl as ctrl'
      });
  });

