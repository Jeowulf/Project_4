'use strict';

angular.module('proj4App')
  .service('portfolioService', function ($http, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.buyStock = function(stock) {
      var userId = Auth.getCurrentUser()._id;
      return $http.post('/api/users/' + userId + '/portfolio/' + stock._id);
    }

    this.getUserPortfolio = function(){
      var userId = Auth.getCurrentUser()._id;
      return $http.get('/api/users/' + userId + '/portfolio/');
    }

  });
