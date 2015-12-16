define([
  'angular',
  'angularRoute',
  'services/yelp-search/yelp-search'
], function(angular) {
  'use strict';

  angular.module('myApp.home', ['ngRoute', 'myApp.yelpSearchService'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    });
  }])
  .controller('HomeCtrl', ['YelpSearchService', function(yelpSearchService) {
    console.log(yelpSearchService.ping());
  }]);
});
