'use strict';

angular.module('proj4App')
.service('twitSentService', function($http){

  this.search = function (userInput) {
    console.log('twitSentQuery' + userInput);
    return $http.post('/api/twitSent', {query: userInput});
  }

  this.findSpecificSentiment = function () {
    console.log('twitSentiment');
    return $http.post('/api/twitSent', {query: '@Madonna'});
  }
});

