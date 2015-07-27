'use strict';

angular.module('proj4App')
  .controller('MainCtrl', function () {
    // var that = this;
    this.colinLinks = [{
      'link': 'mailto:colinrileytaylor@gmail.com',
      'icon':
      'class': "yellow darken"
      },
      // {
      // 'title': 'allPortfolios',
      // 'link': '/allPortfolios',
      // 'img': ""
      // },
     {
      'link': '/stockinventory',
      'img': "../../../../assets/images/stockIcon.png",
      'class': "green"
      },
      {
      'link': '/portfolio',
      'img': "../../../../assets/images/moneyIcon.png",
      'class': "blue"
      }];

       this.justinLinks = [{
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
      'link': '/stockinventory',
      'img': "../../../../assets/images/stockIcon.png",
      'class': "green"
      },
      {
      'link': '/portfolio',
      'img': "../../../../assets/images/moneyIcon.png",
      'class': "blue"
      }];

  });
