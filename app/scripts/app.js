'use strict';

/**
 * @ngdoc overview
 * @name appsProtoApp
 * @description
 * # appsProtoApp
 *
 * Main module of the application.
 */
angular
  .module('appsProtoApp', [
    'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch',
    'dndLists',
    'ui.bootstrap',
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
