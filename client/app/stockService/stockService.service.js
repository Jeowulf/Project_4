'use strict';

angular.module('proj4App')
  .service('stockService', function ($http, Auth) {


    this.createStockInventory = function (){
      return $http.put('/api/stocks');
    }//creates a stock inventory call this before you cal get inventory!!!
    this.getInventory = function() { //gets stock inventory from DB
      return $http.get('/api/stocks');
    }
    this.getUser = function() {
    this.userId = Auth.getCurrentUser()._id;
    console.log(this.userId + 'is userId');
    }


  });
