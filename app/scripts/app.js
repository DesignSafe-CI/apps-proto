'use strict';

var app = angular
  .module('appsProtoApp', [
    'ngAnimate',
    'ngRoute',
    'dndLists',
    'ui.bootstrap',
    'xeditable',
    'AgavePlatformScienceAPILib'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
