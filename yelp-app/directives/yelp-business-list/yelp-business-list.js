require.config({
  paths: {
    'yelp-business-list-html': './directives/yelp-business-list/yelp-business-list.html',
    'yelp-search-service': './services/yelp-search/yelp-search'
  }
});

define(['angular', 'text!yelp-business-list', 'yelp-search-service'], function(angular, html) {
  'use strict';

  angular.module('myApp.yelpBusinessList', ['myApp.yelpSearchService'])
  .directive('yelpBusinessList', [function() {
    return {
      restrict: 'E',
      scope: {},
      template: html,
      controller: 'YelpBusinessListController',
      controllerAs: 'yelpBusinessListCtrl',
      bindToController: {
        limit: '@?',
        searchOptions: '='
      },
      compile: function($element, $attrs) {
        $attrs.limit = $attrs.limit || '20';
      }
    };
  }])
  .controller('YelpBusinessListController', ['$scope', 'YelpSearchService',
    function($scope, yelpSearchService) {
      var _this = this;
      this.offset = 0;
      this.activePage = 1;
      this.startIndex = 0;
      this.endIndex = 0;
      this.total = 0;

      $scope.$watch(function() {
        return _this.searchOptions;
      }, function(newValue) {
        if (typeof newValue.term !== 'undefined' && newValue.term.length > 0) {
          newValue.offset = _this.offset;
          newValue.limit = _this.limit;
          console.log('watch');
          fetchData(newValue);
        }
      });

      var fetchData = function(data) {
        console.log('fetchData', data);
        var yelpPromise = yelpSearchService.search(data);

        yelpPromise.then(function(response) {
          console.log('api data', response);
          _this.total = response.data.total;
          _this.startIndex = (_this.offset * _this.activePage) + 1;
          _this.endIndex = _this.startIndex + parseInt(_this.limit) - 1;
        });
      };
    }]);
});
