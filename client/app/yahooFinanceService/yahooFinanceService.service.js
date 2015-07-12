'use strict';

angular.module('proj4App')
.service('yahooFinanceService', function($http){

  this.search = function (userStockInput) {
    console.log(userStockInput + 'is user userStockInput from service');
    return $http.post('/api/yahooFinance', {symbol: userStockInput});
  }

});

