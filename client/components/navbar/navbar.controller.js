'use strict';

angular.module('proj4App')
  .controller('NavbarCtrl', function ($scope, $location, Auth, stockService, ngDialog) {
    var that = this;
    that.tab = 82;
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }
    // ,
    // {'title': 'Dashboard',
    // 'link': '/dashboard'}
    ];
    $scope.checked = false;
    $scope.toggle = function(){
      console.log('hello!! :');
      $scope.checked = !$scope.checked;
      //janky, but attempting to get the current info in the slideout panel
    }
    $scope.clickToOpen = function () {
      console.log("ngFunctionate!")
        ngDialog.open({ template: 'templateId' });
    };


    $scope.sideMenu = [{
      'title': 'Home',
      'link': '/',
      'img': "../../../../assets/images/homeIcon.png",
      'class': "yellow darken"
      },
      // {
      // 'title': 'allPortfolios',
      // 'link': '/allPortfolios',
      // 'img': ""
      // },
     {
      'title': 'Stocks',
      'link': '/stockinventory',
      'img': "../../../../assets/images/stockIcon.png",
      'class': "green"
      },
      {
      'title': 'My Portfolio',
      'link': '/portfolio',
      'img': "../../../../assets/images/moneyIcon.png",
      'class': "blue"
      },
      {
      'title': 'Research',
      'link': '/research',
      'img': "",
      'class': "black"
      }
    ]

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    console.log($scope.isLoggedIn + ' is looged in');
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
