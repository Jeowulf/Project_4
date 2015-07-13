'use strict';

angular.module('proj4App')
  .service('stockService', function ($http, Auth) {

    this.getInventory = function() {
      return $http.get('/api/stocks');
    }
    this.getUser = function() {
    this.userId = Auth.getCurrentUser()._id;
    console.log(this.userId + 'is userId');
    }


  });
