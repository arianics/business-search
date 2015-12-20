require.config({
  paths: {
    'yelp-business-overview-html': './directives/yelp-business-overview/yelp-business-overview.html',
    'yelp-business-overview-css': './directives/yelp-business-overview/yelp-business-overview'
  }
});

define(['angular', 'text!yelp-business-overview-html', 'css!yelp-business-overview-css'],
  function(angular, html) {
    'use strict';

    angular.module('myApp.yelpBusinessOverview', [])
      .directive('yelpBusinessOverview', [function() {
        return {
          restrict: 'E',
          scope: {},
          template: html,
          controller: 'YelpBusinessOverviewController',
          controllerAs: 'yBOCtrl',
          bindToController: {
            businessData: '='
          }
        };
      }])
      .controller('YelpBusinessOverviewController', [
        function() {

        }
      ]);
  });
