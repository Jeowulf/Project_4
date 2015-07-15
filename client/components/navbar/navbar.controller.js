'use strict';

angular.module('proj4App')
  .controller('NavbarCtrl', function ($scope, $location, Auth, stockService) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {'title': 'Dashboard',
    'link': '/dashboard'}
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
    };
    //Creates the Yahoo stocks (from API) in DB in case it's wiped out!!
    //Using scope b/c navbar was scaffolded
     $scope.createStockInventory = function(){
      stockService.createStockInventory().success(function(json){
        console.log(json)
      });
    }
    //This tells service to tell server to hit the Yahoo API and update the financials in our DB
    $scope.update = function(){
      stockService.updateStocks().success(function(json){
        $scope.stockInventory = json.data;
    });
  }
  });
