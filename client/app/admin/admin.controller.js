'use strict';

angular.module('proj4App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, stockService) {

    this.deleteAllStocks = function(){
      stockService.deleteAllStocks().success(function(json){
        console.log(json);
      });
    }
    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

  });
