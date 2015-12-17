require.config({
  paths: {
    'yelp-search-service': './services/yelp-search/yelp-search',
    'yelp-search-form': './directives/yelp-search-form/yelp-search-form',
    'yelp-business-list': './directives/yelp-business-list/yelp-business-list'
  }
});
define([
  'angular',
  'angularRoute',
  'yelp-search-form',
  'yelp-search-service',
  'yelp-business-list'
], function(angular) {
  'use strict';

  angular.module('myApp.home', ['ngRoute', 'myApp.yelpSearchService',
      'myApp.yelpSearchForm', 'myApp.yelpBusinessList'
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'

      });
    }])
    .controller('HomeController', ['YelpSearchService',
      function(yelpSearchService) {
        var _this = this;
        console.log(yelpSearchService.ping());
        this.searchOptions = {};
        this.formData = function(data) {
          _this.searchOptions = data;
        };
      }
    ]);
});
