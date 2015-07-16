'use strict';

angular.module('proj4App')
  .service('portfolioService', function ($http, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.buyStock = function(stock) {
      var userId = Auth.getCurrentUser()._id;
      var qty = stock.qty;
      console.log(qty + "is qty");
      return $http.post('/api/users/' + userId + '/portfolio/' + stock._id, {qty: qty});
    }

    this.sellStock = function(stock) {
      var qty = stock.qty; //TODO: find another way!!!
      console.log(qty + 'is sell qty');
      var userId = Auth.getCurrentUser()._id;
      return $http.patch('/api/users/' + userId + '/portfolio/' + stock._id, {qty: qty});
    }

    this.getUserPortfolio = function(){
      var userId = Auth.getCurrentUser()._id;
      return $http.get('/api/users/' + userId + '/portfolio/');
    }

    this.getAllPortfolios = function() {
      return $http.get('/api/portfolio');
    }

  });
