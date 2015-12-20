require.config({
  paths: {
    'yelp-business-overview-html': './directives/yelp-business-overview/yelp-business-overview.html',
    'yelp-business-overview-css': './directives/yelp-business-overview/yelp-business-overview',
    'add-to-list': './directives/add-to-list/add-to-list'
  }
});

define(['angular', 'text!yelp-business-overview-html',
  'css!yelp-business-overview-css', 'add-to-list'],
  function(angular, html) {
    'use strict';

    angular.module('myApp.yelpBusinessOverview', ['myApp.addToList'])
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
