'use strict';

angular.module('proj4App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('research', {
        url: '/research',
        templateUrl: 'app/dashboard/research/research.html',
        controller: 'ResearchCtrl as ctrl'
      });
  });
