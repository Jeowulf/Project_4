'use strict';

angular.module('proj4App')
.service('twitSentService', function($http){

  this.search = function (userInput) {
    return $http.post('/api/twitSent', {query: userInput});
  }

});

