'use strict';

angular.module('proj4App')
  .service('stockService', function ($http, Auth) {


    this.createStockInventory = function (){
      return $http.put('/api/stocks');
    }//creates a stock inventory call this before you cal get inventory!!!

    this.getInventory = function() { //gets stock inventory from DB
      console.log('getStockInventory was called');
      return $http.get('/api/stocks');
    }
    this.getUser = function() { //for testing
      this.userId = Auth.getCurrentUser()._id;
      console.log(this.userId + 'is userId');
    }

    this.updateStocks = function() {
      return $http.patch('/api/stocks');
    }
    this.deleteAllStocks = function() {
      return $http.delete('/api/stocks');
    }

  });
