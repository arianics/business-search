define([
  'angular'
], function(angular) {
  'use strict';
  // Declare app level module which depends on views, and components
  return angular.module('myApp', [
    'ngRoute',
    'myApp.home'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }]);
});
