require.config({
  paths: {
    'yelp-business-overview-html': './directives/yelp-business-overview/yelp-business-overview.html'
  }
});

define(['angular', 'text!yelp-business-overview-html'],
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
