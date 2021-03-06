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
    'YelpSearchService', '$routeParams', '$timeout', 'addressBookService',
    function($scope, yelpSearchService, $routeParams, $timeout, addressBookService) {
      var _this = this;
      var apiCallInterval = null;
      this.startIndex = 0;
      this.endIndex = 0;
      this.total = 0;
      this.numPages = 0;
      this.businessList = [];

      $scope.$watch(function() {
        return _this.searchOptions;
      }, function(newValue, oldValue) {
        if (typeof newValue.term !== 'undefined' && newValue.term.length > 0) {
          $timeout.cancel(apiCallInterval);
          apiCallInterval = $timeout(function() {
            fetchData(newValue);
          }, 500);
        }
      }, true);

      this.selectAll = function() {
        for (let i = 0; i < _this.businessList.length; i++) {
          var businesData = _this.businessList[i];
          if (!addressBookService.contains(businesData.id)) {
            addressBookService.add(businesData.id);
          }
        }
      };
      var fetchData = function(data) {
        var yelpPromise = yelpSearchService.search(data);

        yelpPromise.then(function(response) {
          _this.total = response.data.jsonBody.total;
          _this.startIndex = response.config.data.offset + 1;
          _this.endIndex = _this.startIndex + response.config.data.limit - 1;
          _this.numPages = Math.ceil(_this.total / response.config.data.limit);
          _this.businessList = response.data.jsonBody.businesses;
        });
      };
    }]);
});
