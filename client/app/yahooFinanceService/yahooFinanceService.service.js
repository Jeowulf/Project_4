'use strict';

angular.module('proj4App')
.service('yahooFinanceService', function($http){

  this.search = function (userInput) {
    return $http.post('/api/yahooFinance', {query: userInput});
  }

});

