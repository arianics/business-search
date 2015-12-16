define([
  'angular',
  'angularRoute',
  'home/home'
], function(angular, angularRoute, home) {
  'use strict';
  // Declare app level module which depends on views, and components
  return angular.module('myApp', [
    'ngRoute',
    'myApp.home'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
});
