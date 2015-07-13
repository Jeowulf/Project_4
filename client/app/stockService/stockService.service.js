'use strict';

angular.module('proj4App')
  .service('stockService', function ($http) {

    this.getInventory = function() {
      return $http.get('/api/stocks');
    }
  });
