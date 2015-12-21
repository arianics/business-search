require.config({
  paths: {
    'yelp-search-service': './services/yelp-search/yelp-search',
    'yelp-search-form': './directives/yelp-search-form/yelp-search-form',
    'yelp-business-list': './directives/yelp-business-list/yelp-business-list',
    'address-book': './services/address-book/address-book'
  }
});
define([
  'angular',
  'angularRoute',
  'yelp-search-form',
  'yelp-search-service',
  'yelp-business-list',
  'ngCsv',
  'address-book'
], function(angular) {
  'use strict';

  angular.module('myApp.home', ['ngRoute', 'ngSanitize', 'ngCsv',
    'myApp.yelpSearchService', 'myApp.yelpSearchForm', 'myApp.yelpBusinessList',
    'myApp.addressBookService'
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
      '$routeParams', '$location', 'addressBookService',
      function($scope, yelpSearchService, yelpSearchData, $routeParams,
        $location, addressBookService) {
        var _this = this;

        _this.items = addressBookService.getIds();
        _this.searchOptions = yelpSearchData.getData() || {};

        var urlPage = $routeParams.page || 1;
        _this.searchOptions.limit = 20;
        _this.activePage = Math.max(parseInt(urlPage), 1);
        _this.searchOptions.offset = (_this.activePage - 1) * _this.searchOptions.limit;

        this.formData = function(data) {
          if ((typeof $routeParams.page !== 'undefined' && $routeParams.page !== '1') ||
            _this.searchOptions.term !== data.term) {
            yelpSearchData.setData(data);
            $location.path('/');
          }

          _this.searchOptions = data;
        };

        this.exportData = function() {
          return addressBookService.getDataArray();
        };
      }
    ]);
});
