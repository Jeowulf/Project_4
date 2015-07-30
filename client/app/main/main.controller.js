'use strict';

angular.module('proj4App')
  .controller('MainCtrl', function () {
    this.colinLinks = [
      {
      'icon': 'fa fa-github',
      'link': 'https://github.com/ColinRTaylor',
      },
      {
      'icon': 'fa fa-linkedin',
      'link': 'https://www.linkedin.com/in/colinrtaylor',
      },
      {
      'icon': 'fa fa-globe',
      'link': 'https://colinrtaylor.com',
      }
    ];
     this.justinLinks = [
      {
      'icon': 'fa fa-github',
      'link': 'https://github.com/Jeowulf',
      },
      {
      'icon': 'fa fa-linkedin',
      'link': 'https://www.linkedin.com/in/jjacot',
      },
      {
      'icon': 'fa fa-globe',
      'link': 'http://justinjacot.me/',
      }
    ];


  });
