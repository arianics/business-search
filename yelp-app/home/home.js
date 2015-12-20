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
      }).when('/:page', {
        templateUrl: 'home/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl',
        reloadOnSearch: false
      });
    }])
    .controller('HomeController', ['$scope', 'YelpSearchService', 'yelpSearchData',
      '$routeParams', '$location', '$route',
      function($scope, yelpSearchService, yelpSearchData, $routeParams, $location, $route) {
        var _this = this;
        // _this.searchData = yelpSearchData.getData() || {};
        _this.searchOptions = yelpSearchData.getData() || {};

        var urlPage = $routeParams.page || 1;
        _this.searchOptions.limit = 20;
        _this.activePage = Math.max(parseInt(urlPage), 1);
        _this.searchOptions.offset = (_this.activePage - 1) * _this.searchOptions.limit;

        this.formData = function(data) {
          console.log('home.js::formData::', data, _this.searchOptions, _this.searchData, yelpSearchData.getData());
          console.log('homejs', _this.searchOptions.term !== data.term);
          if ((typeof $routeParams.page !== 'undefined' && $routeParams.page !== '1') ||
            _this.searchOptions.term !== data.term) {
            console.log('ready to redirect');
            yelpSearchData.setData(data);
            $location.path('/');
          } 

          _this.searchOptions = data;
          
        };

      }
    ]);
});
