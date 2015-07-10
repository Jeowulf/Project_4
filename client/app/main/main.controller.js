'use strict';

angular.module('proj4App')
  .controller('MainCtrl', function ($scope, $http, socket) {
    var that = this;

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    that.search = function () {
      // console.log(that.userInput);
      var x = that.userInput;
      console.log(that.userInput)
     return $http.post('/api/things', {search: x});
    };


  });
