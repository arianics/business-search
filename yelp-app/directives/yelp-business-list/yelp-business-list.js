require.config({
  paths: {
    'yelp-business-list-html': './directives/yelp-business-list/yelp-business-list.html',
    'yelp-search-service': './services/yelp-search/yelp-search',
    'yelp-business-overview': './directives/yelp-business-overview/yelp-business-overview',
    'pagination': './directives/pagination/pagination'
  }
});

define(['angular', 'text!yelp-business-list-html', 'yelp-search-service',
  'pagination', 'yelp-business-overview'],
  function(angular, html) {
  'use strict';

  angular.module('myApp.yelpBusinessList', ['myApp.yelpSearchService',
    'myApp.yelpBusinessOverview', 'myApp.pagination'])
  .directive('yelpBusinessList', [function() {
    return {
      restrict: 'E',
      scope: {},
      template: html,
      controller: 'YelpBusinessListController',
      controllerAs: 'yelpBusinessListCtrl',
      bindToController: {
        searchOptions: '=',
        activePage: '@?'
      },
      compile: function($element, $attrs) {
        $attrs.activePage = $attrs.activePage || 1;
      }
    };
  }])
  .controller('YelpBusinessListController', ['$scope',
    'YelpSearchService', '$routeParams', '$timeout',
    function($scope, yelpSearchService, $routeParams, $timeout) {
      var _this = this;
      console.log('watch', $routeParams);
      var apiCallInterval = null;
      this.startIndex = 0;
      this.endIndex = 0;
      this.total = 0;
      this.numPages = 0;
      this.businessList = [];

      $scope.$watch(function() {
        return _this.searchOptions;
      }, function(newValue, oldValue) {
        console.log('searchOptions updated', newValue, oldValue);
        if (typeof newValue.term !== 'undefined' && newValue.term.length > 0) {
          $timeout.cancel(apiCallInterval);
          apiCallInterval = $timeout(function() {
            fetchData(newValue);
          }, 500);
        }
      }, true);

      var fetchData = function(data) {
        console.log('fetchData', data);
        var yelpPromise = yelpSearchService.search(data);

        yelpPromise.then(function(response) {
          console.log('api data', response);
          _this.total = response.data.total;
          _this.startIndex = response.config.data.offset + 1;
          _this.endIndex = _this.startIndex + response.config.data.limit - 1;
          _this.numPages = Math.ceil(_this.total / response.config.data.limit);
          _this.businessList = response.data.businesses;
        });
      };
    }]);
});
